"use client";

import React, { useEffect, useState } from "react";

type Topping = {
  id: number | null;

  name: string;

  price: number;
};

type Props = {
  onClose: () => void;

  mode: "create" | "edit";

  product?: any;
};

const ModalForm = ({ onClose, mode, product }: Props) => {
  const [loading, setLoading] = useState(false);

  const [toppingsLoading, setToppingsLoading] = useState(false);

  // =========================
  // FORM
  // =========================

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    sku: "",
    price: "",
    costPrice: "",
    description: "",
    active: true,
  });

  const [preview, setPreview] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (mode !== "edit" || !product) return;

    setFormData({
      name: product.name || "",
      category: product.categoryId ?? product.category?.id ?? "",
      sku: product.code || "",
      price: product.basePrice?.toString() ?? "",
      costPrice: product.costPrice?.toString() ?? "",
      description: product.description || "",
      active: product.status !== "INACTIVE",
    });

    setSelectedToppings(product.toppings || []);
    setImageUrl(product.image || "");
    setPreview(product.image || "");
  }, [mode, product]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (key: string, value: any) => {
    setErrors((prev) => ({
      ...prev,
      [key]: "",
    }));
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Vui lòng nhập tên sản phẩm";
    }

    if (!formData.category) {
      nextErrors.category = "Vui lòng chọn danh mục";
    }

    if (!formData.sku.trim()) {
      nextErrors.sku = "Vui lòng nhập mã sản phẩm";
    }

    const priceValue = Number(formData.price);
    if (!formData.price.toString().trim()) {
      nextErrors.price = "Vui lòng nhập giá bán";
    } else if (Number.isNaN(priceValue) || priceValue <= 0) {
      nextErrors.price = "Giá bán phải lớn hơn 0";
    }

    const costPriceValue = Number(formData.costPrice);
    if (!formData.costPrice.toString().trim()) {
      nextErrors.costPrice = "Vui lòng nhập giá vốn";
    } else if (Number.isNaN(costPriceValue) || costPriceValue < 0) {
      nextErrors.costPrice = "Giá vốn không hợp lệ";
    }

    if (!nextErrors.price && !nextErrors.costPrice) {
      if (priceValue < costPriceValue) {
        nextErrors.price = "Giá bán phải lớn hơn hoặc bằng giá vốn";
      }
    }

    if (!formData.description.trim()) {
      nextErrors.description = "Vui lòng nhập mô tả sản phẩm";
    }

    if (!imageUrl) {
      nextErrors.image = "Vui lòng tải lên hình ảnh sản phẩm";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  // =========================
  // FORM
  // =========================

  // =========================
  // IMAGE
  // =========================

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // preview local
    setPreview(URL.createObjectURL(file));

    const formData = new FormData();

    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",

        body: formData,
      });

      const data = await response.json();

      setImageUrl(data.url);
      setErrors((prev) => ({
        ...prev,
        image: "",
      }));
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // IMAGE
  // =========================

  // =========================
  // TOPPINGS
  // =========================

  const [toppings, setToppings] = useState<Topping[]>([]);

  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);

  const [newTopping, setNewTopping] = useState("");
  const [newToppingPrice, setNewToppingPrice] = useState<number>(0);

  // get toppings
  useEffect(() => {
    const fetchToppings = async () => {
      try {
        setToppingsLoading(true);

        const response = await fetch("/api/toppings");

        const data = await response.json();

        setToppings(data.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setToppingsLoading(false);
      }
    };

    fetchToppings();
  }, []);

  // toggle topping
  const handleToggleTopping = (topping: Topping) => {
    const exists = selectedToppings.find((item) => item.name === topping.name);

    if (exists) {
      setSelectedToppings((prev) =>
        prev.filter((item) => item.name !== topping.name),
      );

      return;
    }

    setSelectedToppings((prev) => [...prev, topping]);
  };

  // create topping local
  const handleCreateTopping = () => {
    if (!newTopping.trim()) return;

    const exists = [...toppings, ...selectedToppings].find(
      (item) => item.name.toLowerCase() === newTopping.toLowerCase(),
    );

    if (exists) {
      alert("Topping đã tồn tại");

      return;
    }

    const topping: Topping = {
      id: null,

      name: newTopping,

      price: 0,
    };

    setSelectedToppings((prev) => [...prev, topping]);

    setNewTopping("");
  };

  const [categories, setCategories] = useState([]);
  const handleGetCategories = async () => {
    try {
      const response = await fetch("/api/categories", {
        method: "GET",
      });

      const result = await response.json();

      if (result.success) {
        setCategories(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetCategories();
  }, []);

  // submit
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...formData,

        image: imageUrl,

        toppings: selectedToppings,
      };

      console.log(payload);

      // create
      if (mode === "create") {
        await fetch("/api/products", {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(payload),
        });
      }

      // update
      if (mode === "edit" && product?.id) {
        await fetch(`/api/products/${product.id}`, {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(payload),
        });
      }

      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-md">
      <div className="bg-surface w-full max-w-5xl max-h-[921px] rounded-lg shadow-[0px_10px_40px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="px-gutter py-md border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-low">
          <div className="flex items-center gap-sm">
            <h2 className="font-headline-md text-headline-md text-on-surface">
              {mode === "create" ? "Thêm sản phẩm mới" : "Chỉnh sửa sản phẩm"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-error-container hover:text-on-error-container transition-all squishy-btn"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-gutter space-y-lg">
          <form className="grid grid-cols-12 gap-xl">
            <div className="col-span-12 lg:col-span-7 space-y-lg">
              <section>
                <h3 className="font-headline-md text-body-lg font-bold text-primary mb-md text-left">
                  Thông tin cơ bản
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                  <div className="col-span-full">
                    <label className="block font-label-lg text-label-lg text-on-surface-variant mb-xs">
                      Tên sản phẩm
                    </label>
                    <input
                      className="w-full h-touch-target-min border-2 border-outline-variant/50 rounded-lg px-md focus:border-tertiary focus:ring-0 focus:outline-none outline-none transition-all font-body-md"
                      placeholder="VD: Kem Dâu Tây Thượng Hạng"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-error">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block font-label-lg text-label-lg text-on-surface-variant mb-xs">
                      Danh mục
                    </label>
                    <select
                      className="w-full h-touch-target-min border-2 border-outline-variant/50 rounded-lg px-md focus:border-tertiary focus:ring-0 focus:outline-none outline-none transition-all font-body-md bg-surface"
                      value={formData.category}
                      onChange={(e) => handleChange("category", e.target.value)}
                    >
                      <option value="" disabled hidden>
                        Chọn danh mục
                      </option>
                      {categories.map((item: any) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="mt-1 text-xs text-error">
                        {errors.category}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block font-label-lg text-label-lg text-on-surface-variant mb-xs">
                      Mã sản phẩm (SKU)
                    </label>
                    <input
                      className="w-full h-touch-target-min border-2 border-outline-variant/50 rounded-lg px-md focus:border-tertiary focus:ring-0 focus:outline-none outline-none transition-all font-body-md"
                      placeholder="ICE-STR-001"
                      type="text"
                      value={formData.sku}
                      onChange={(e) => handleChange("sku", e.target.value)}
                    />
                    {errors.sku && (
                      <p className="mt-1 text-xs text-error">{errors.sku}</p>
                    )}
                  </div>
                  <div>
                    <label className="block font-label-lg text-label-lg text-on-surface-variant mb-xs">
                      Giá bán
                    </label>
                    <div className="relative">
                      <input
                        className="w-full h-touch-target-min border-2 border-outline-variant/50 rounded-lg pl-md pr-xl focus:border-tertiary focus:ring-0 focus:outline-none outline-none transition-all font-body-md"
                        placeholder="45.000"
                        type="number"
                        value={formData.price}
                        onChange={(e) => handleChange("price", e.target.value)}
                      />
                      <span className="absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant font-bold">
                        VNĐ
                      </span>
                    </div>
                    {errors.price && (
                      <p className="mt-1 text-xs text-error">{errors.price}</p>
                    )}
                  </div>
                  <div>
                    <label className="block font-label-lg text-label-lg text-on-surface-variant mb-xs">
                      Giá vốn
                    </label>
                    <div className="relative">
                      <input
                        className="w-full h-touch-target-min border-2 border-outline-variant/50 rounded-lg pl-md pr-xl focus:border-tertiary focus:ring-0 focus:outline-none outline-none transition-all font-body-md"
                        placeholder="25.000"
                        type="number"
                        value={formData.costPrice}
                        onChange={(e) =>
                          handleChange("costPrice", e.target.value)
                        }
                      />
                      <span className="absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant font-bold">
                        VNĐ
                      </span>
                    </div>
                    {errors.costPrice && (
                      <p className="mt-1 text-xs text-error">
                        {errors.costPrice}
                      </p>
                    )}
                  </div>
                </div>
              </section>
              <section>
                <h3 className="mb-md font-headline-md text-body-lg font-bold text-primary">
                  Hình ảnh sản phẩm
                </h3>

                <label className="group relative flex h-64 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-outline-variant bg-surface-container-low transition-colors hover:bg-primary-container/10">
                  {/* Preview */}
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="mb-sm flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
                        <span className="material-symbols-outlined text-3xl text-primary">
                          add_a_photo
                        </span>
                      </div>

                      <p className="font-label-lg font-bold text-on-surface">
                        Tải lên hình ảnh sản phẩm
                      </p>

                      <p className="mt-xs font-label-md text-on-surface-variant">
                        Hỗ trợ JPG, PNG (Tối đa 5MB)
                      </p>
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleUpload}
                  />
                </label>
                {errors.image && (
                  <p className="mt-2 text-xs text-error">{errors.image}</p>
                )}
              </section>
            </div>
            <div className="col-span-12 lg:col-span-5 space-y-lg">
              <section>
                <h3 className="font-headline-md text-body-lg font-bold text-primary mb-md">
                  Chi tiết &amp; Trạng thái
                </h3>
                <div className="space-y-md">
                  <div>
                    <label className="block font-label-lg text-label-lg text-on-surface-variant mb-xs">
                      Mô tả sản phẩm
                    </label>
                    <textarea
                      className="w-full border-2 border-outline-variant/50 rounded-lg px-md py-sm focus:border-tertiary focus:ring-0 focus:outline-none outline-none transition-all font-body-md resize-none"
                      placeholder="Nhập mô tả chi tiết về hương vị, thành phần..."
                      rows={4}
                      value={formData.description}
                      onChange={(e) =>
                        handleChange("description", e.target.value)
                      }
                    ></textarea>
                    {errors.description && (
                      <p className="mt-1 text-xs text-error">
                        {errors.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-between p-md bg-surface-container rounded-lg">
                    <div>
                      <p className="font-label-lg text-on-surface">
                        Trạng thái kinh doanh
                      </p>
                      <p className="text-[12px] text-on-surface-variant">
                        Cho phép khách hàng đặt món này
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        className="sr-only peer"
                        type="checkbox"
                        checked={formData.active}
                        onChange={(e) =>
                          handleChange("active", e.target.checked)
                        }
                      />
                      <div className="w-14 h-8 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-secondary"></div>
                    </label>
                  </div>
                </div>
              </section>
              {/* TOPPINGS */}
              <section>
                <div className="mb-md flex items-center justify-between">
                  <h3 className="font-headline-md text-body-lg font-bold text-primary">
                    Toppings & Tùy chọn
                  </h3>
                </div>

                {/* CREATE TOPPING */}
                <div className="mb-md flex gap-sm flex-col">
                  <div className="flex flex-1 items-center gap-sm ">
                    {/* NAME */}
                    <input
                      value={newTopping}
                      onChange={(e) => setNewTopping(e.target.value)}
                      placeholder="Tên topping..."
                      className="h-11 flex-1 w-40 rounded-lg border px-4"
                    />

                    {/* PRICE */}
                    <input
                      type="number"
                      value={newToppingPrice}
                      onChange={(e) =>
                        setNewToppingPrice(Number(e.target.value))
                      }
                      placeholder="Giá"
                      className="h-11 w-30 rounded-lg border px-4"
                    />
                  </div>

                  {/* BUTTON */}
                  <button
                    type="button"
                    onClick={handleCreateTopping}
                    className="cursor-pointer rounded-lg h-11 bg-primary px-4 text-white"
                  >
                    Thêm
                  </button>
                </div>

                {/* LIST */}
                <div className="space-y-sm">
                  {toppingsLoading && <div>Đang tải toppings...</div>}

                  {toppings.map((topping) => {
                    const active = selectedToppings.find(
                      (item) => item.name === topping.name,
                    );

                    return (
                      <div
                        key={topping.id}
                        onClick={() => handleToggleTopping(topping)}
                        className="group flex cursor-pointer items-center justify-between rounded-lg border border-outline-variant/30 p-sm transition-colors hover:bg-surface-container-low"
                      >
                        <div className="flex items-center gap-sm">
                          <div
                            className={`
                                flex h-6 w-6 items-center justify-center rounded border-2
                                ${
                                  active
                                    ? "border-tertiary bg-tertiary text-white"
                                    : "border-outline"
                                }
                              `}
                          >
                            {active && (
                              <span className="material-symbols-outlined text-[16px]">
                                check
                              </span>
                            )}
                          </div>

                          <span className="font-body-md">{topping.name}</span>
                        </div>

                        <span className="font-label-lg text-on-surface-variant">
                          +{topping.price.toLocaleString()}đ
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* SELECTED */}
                {!!selectedToppings.length && (
                  <div className="mt-md rounded-lg bg-surface-container-low p-sm">
                    <p className="mb-2 font-bold text-left">Đã chọn:</p>

                    <div className="flex flex-wrap gap-2">
                      {selectedToppings.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-sm text-white"
                        >
                          {item.name}

                          {item.id === null && <span>(mới)</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            </div>
          </form>
        </div>
        <div className="px-gutter py-md bg-surface-container-high flex justify-end gap-md">
          <button
            onClick={onClose}
            className="px-xl h-touch-target-min rounded-full border-2 border-outline-variant text-on-surface-variant font-bold hover:bg-white/50 transition-all squishy-btn"
          >
            Hủy bỏ
          </button>
          {loading ? (
            <button className="px-xl h-touch-target-min rounded-full bg-primary text-white font-bold shadow-[0px_4px_12px_rgba(138,72,111,0.3)] hover:brightness-110 transition-all squishy-btn flex items-center gap-sm">
              <span className="material-symbols-outlined animate-spin">
                progress_activity
              </span>
              Đang lưu...
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-xl h-touch-target-min rounded-full bg-primary text-white font-bold shadow-[0px_4px_12px_rgba(138,72,111,0.3)] hover:brightness-110 transition-all squishy-btn flex items-center gap-sm"
            >
              <span className="material-symbols-outlined">save</span>
              Lưu sản phẩm
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
