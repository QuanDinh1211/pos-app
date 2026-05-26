"use client";

import React, { useState } from "react";

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
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    sku: "",
    price: "",
    costPrice: "",
    description: "",
    active: true,
  });

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // upload ảnh

  const [preview, setPreview] = useState("");

  const [imageUrl, setImageUrl] = useState("");

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
    } catch (error) {
      console.log(error);
    }
  };

  // upload ảnh

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center modal-overlay p-gutter"
      id="modal"
    >
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
                <h3 className="font-headline-md text-body-lg font-bold text-primary mb-md">
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
                      <option>Kem ly</option>
                      <option>Đồ uống</option>
                      <option>Topping</option>
                    </select>
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
                      onChange={(e) =>
                        handleChange("description", e.target.value)
                      }
                    ></textarea>
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
              <section>
                <div className="flex justify-between items-center mb-md">
                  <h3 className="font-headline-md text-body-lg font-bold text-primary">
                    Toppings &amp; Tùy chọn
                  </h3>
                  <button
                    className="text-secondary font-label-lg flex items-center gap-1 hover:underline"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      add_circle
                    </span>
                    Thêm nhóm
                  </button>
                </div>
                <div className="space-y-sm">
                  <div className="flex items-center justify-between p-sm border border-outline-variant/30 rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer group">
                    <div className="flex items-center gap-sm">
                      <div className="w-6 h-6 border-2 border-tertiary rounded flex items-center justify-center bg-tertiary text-white">
                        <span className="material-symbols-outlined text-[16px]">
                          check
                        </span>
                      </div>
                      <span className="font-body-md">Cốm cầu vồng</span>
                    </div>
                    <span className="text-on-surface-variant font-label-lg">
                      +5.000đ
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-sm border border-outline-variant/30 rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer">
                    <div className="flex items-center gap-sm">
                      <div className="w-6 h-6 border-2 border-outline rounded"></div>
                      <span className="font-body-md">Sốt Sô-cô-la</span>
                    </div>
                    <span className="text-on-surface-variant font-label-lg">
                      +7.000đ
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-sm border border-outline-variant/30 rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer">
                    <div className="flex items-center gap-sm">
                      <div className="w-6 h-6 border-2 border-outline rounded"></div>
                      <span className="font-body-md">Hạt dẻ nghiền</span>
                    </div>
                    <span className="text-on-surface-variant font-label-lg">
                      +10.000đ
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-sm border border-outline-variant/30 rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer">
                    <div className="flex items-center gap-sm">
                      <div className="w-6 h-6 border-2 border-outline rounded"></div>
                      <span className="font-body-md">Bánh quế</span>
                    </div>
                    <span className="text-on-surface-variant font-label-lg">
                      +8.000đ
                    </span>
                  </div>
                </div>
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
          <button className="px-xl h-touch-target-min rounded-full bg-primary text-white font-bold shadow-[0px_4px_12px_rgba(138,72,111,0.3)] hover:brightness-110 transition-all squishy-btn flex items-center gap-sm">
            <span className="material-symbols-outlined">save</span>
            Lưu sản phẩm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
