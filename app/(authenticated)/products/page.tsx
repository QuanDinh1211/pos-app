"use client";

import CreateProduct from "@/components/sections/product/Create";
import UpdateProduct from "@/components/sections/product/Update";
import { CommonStatus } from "@/configs/global";
import React, { useEffect, useState } from "react";

const page = () => {
  const [request, setRequest] = useState({
    keySearch: "",
    categories: [-1],
    status: -1,
    page: 1,
    pageSize: 10,
  });

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

  const [products, setProducts] = useState<any[]>([]);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    pageSize: 10,
    totalPages: 0,
  });

  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams();

      if (request.keySearch && request.keySearch.trim()) {
        params.set("keyword", request.keySearch.trim());
      }

      const categoryIds = request.categories || [];
      if (categoryIds.length && !categoryIds.includes(-1)) {
        categoryIds.forEach((id: number) =>
          params.append("categoryId", String(id)),
        );
      }

      if (request.status && request.status !== -1) {
        params.set("status", String(request.status));
      }

      params.set("page", String(request.page || 1));
      params.set("pageSize", String(request.pageSize || 10));

      const res = await fetch(`/api/products?${params.toString()}`);
      const json = await res.json();

      setProducts(json.data || []);
      setMeta({
        total: json.meta?.total || 0,
        page: json.meta?.page || 1,
        pageSize: json.meta?.pageSize || request.pageSize,
        totalPages: json.meta?.totalPages || 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    const confirmed = window.confirm(
      "Bạn có chắc chắn muốn xóa sản phẩm này không?",
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (response.ok) {
        await fetchProducts();
      } else {
        console.error(result.message || "Xóa sản phẩm thất bại");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [request]);

  return (
    <div className="pt-24 px-lg pb-lg space-y-gutter">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary font-bold">
            Quản lý sản phẩm
          </h2>
          <p className="text-on-surface-variant font-body-md text-body-md">
            Danh sách tất cả các loại kem và đồ uống hiện có tại cửa hàng.
          </p>
        </div>

        <CreateProduct />
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-surface-container-highest">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-4">
              Bộ lọc
            </h3>
            <div className="space-y-6">
              <div>
                <label className="font-label-lg text-label-lg text-on-surface-variant block mb-2">
                  Danh mục
                </label>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      className="w-6 h-6 rounded-md border-2 border-outline-variant text-secondary focus:ring-secondary"
                      type="checkbox"
                      checked={request.categories?.[0] === -1}
                      onChange={() =>
                        setRequest((prev) => ({
                          ...prev,
                          categories: [-1],
                          page: 1,
                        }))
                      }
                    />
                    <span className="font-body-md text-body-md group-hover:text-secondary transition-colors">
                      Tất cả
                    </span>
                  </label>
                  {categories.map((item: any) => (
                    <label
                      key={item.id}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        className="w-6 h-6 rounded-md border-2 border-outline-variant text-secondary focus:ring-secondary"
                        type="checkbox"
                        checked={request.categories?.includes(item.id)}
                        onChange={() =>
                          setRequest((prev) => {
                            const current = new Set(prev.categories || []);
                            if (current.has(item.id)) {
                              current.delete(item.id);
                            } else {
                              current.delete(-1); // remove 'all' when selecting specific
                              current.add(item.id);
                            }

                            return {
                              ...prev,
                              categories: Array.from(current),
                              page: 1,
                            };
                          })
                        }
                      />
                      <span className="font-body-md text-body-md group-hover:text-secondary transition-colors">
                        {item.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-outline-variant">
                <label className="font-label-lg text-label-lg text-on-surface-variant block mb-2">
                  Trạng thái
                </label>
                <select
                  value={request.status}
                  onChange={(e) => {
                    setRequest((prev: any) => ({
                      ...prev,
                      status: e.target.value || -1,
                      page: 1,
                    }));
                  }}
                  className="w-full p-3 bg-surface-container border border-outline-variant rounded-full text-body-md font-body-md focus:ring-2 focus:ring-secondary outline-none appearance-none"
                >
                  <option value={-1}>Tất cả trạng thái</option>
                  {[...CommonStatus].map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={() => {
                  setRequest({
                    keySearch: "",
                    categories: [-1],
                    status: -1,
                    page: 1,
                    pageSize: 10,
                  });
                }}
                className="w-full py-3 mt-4 border-2 border-secondary text-secondary font-label-lg rounded-full hover:bg-secondary-container/20 transition-all active:scale-[0.98]"
              >
                Làm mới bộ lọc
              </button>
            </div>
          </div>
          <div className="bg-tertiary-container/30 p-6 rounded-lg border border-tertiary-container flex items-center justify-between">
            <div>
              <p className="text-on-tertiary-container font-label-lg">
                Tổng sản phẩm
              </p>
              <p className="text-price-display font-price-display text-on-tertiary-container">
                42
              </p>
            </div>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-tertiary">
                inventory
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-9 bg-white rounded-lg shadow-sm border border-surface-container-highest overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low border-b border-surface-container-highest">
                <tr>
                  <th className="px-6 py-4 font-label-lg text-label-lg text-on-surface-variant">
                    Sản phẩm
                  </th>
                  <th className="px-6 py-4 font-label-lg text-label-lg text-on-surface-variant">
                    Danh mục
                  </th>
                  <th className="px-6 py-4 font-label-lg text-label-lg text-on-surface-variant text-right">
                    Giá gốc
                  </th>
                  <th className="px-6 py-4 font-label-lg text-label-lg text-on-surface-variant text-center">
                    Trạng thái
                  </th>
                  <th className="px-6 py-4 font-label-lg text-label-lg text-on-surface-variant text-right">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-highest">
                {products.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-8 text-center text-on-surface-variant"
                    >
                      Không có sản phẩm
                    </td>
                  </tr>
                ) : (
                  products.map((product: any) => (
                    <tr
                      key={product.id}
                      className="hover:bg-surface-container-lowest transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-xl bg-surface-container-high overflow-hidden shadow-sm flex-shrink-0">
                            <img
                              alt={product.name}
                              className="w-full h-full object-cover"
                              src={product.image || ""}
                            />
                          </div>
                          <div>
                            <p className="font-headline-md text-on-surface leading-tight">
                              {product.name}
                            </p>
                            <p className="text-label-md text-on-surface-variant">
                              Mã: {product.code}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-primary-container/30 text-on-primary-container rounded-full text-label-md font-label-md">
                          {product.category?.name || "-"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <p className="font-price-display text-on-surface text-[18px]">
                          {Number(product.basePrice).toLocaleString()}đ
                        </p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-md font-label-md ${product.status === "ACTIVE" ? "bg-secondary-container/40 text-secondary" : product.status === "INACTIVE" ? "bg-error-container/40 text-error" : "bg-outline-variant/30 text-on-surface-variant"}`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${product.status === "ACTIVE" ? "bg-secondary" : product.status === "INACTIVE" ? "bg-error" : "bg-outline"}`}
                          ></span>
                          {product.status === "ACTIVE"
                            ? "Sẵn sàng"
                            : product.status === "INACTIVE"
                              ? "Hết hàng"
                              : "Tạm ẩn"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <UpdateProduct productId={product.id} />
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container/20 rounded-full transition-all"
                          >
                            <span className="material-symbols-outlined">
                              delete
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {meta.total < 1 ? null : (
            <div className="px-6 py-4 bg-surface-container-low border-t border-surface-container-highest flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <span className="text-label-lg text-on-surface-variant">
                Đang hiển thị {products.length} trong số {meta.total} sản phẩm
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setRequest((prev) => ({
                      ...prev,
                      page: Math.max(1, meta.page - 1),
                    }))
                  }
                  disabled={meta.page <= 1}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant text-on-surface-variant transition-colors disabled:opacity-50"
                >
                  <span className="material-symbols-outlined">
                    chevron_left
                  </span>
                </button>
                {Array.from(
                  { length: Math.min(meta.totalPages, 5) },
                  (_, i) => {
                    const pageNumber =
                      meta.page <= 3
                        ? i + 1
                        : Math.min(meta.totalPages - 4 + i, meta.totalPages);
                    if (pageNumber < 1 || pageNumber > meta.totalPages)
                      return null;
                    return (
                      <button
                        key={pageNumber}
                        type="button"
                        onClick={() =>
                          setRequest((prev) => ({ ...prev, page: pageNumber }))
                        }
                        className={`w-10 h-10 flex items-center justify-center rounded-full font-label-lg ${pageNumber === meta.page ? "bg-primary text-on-primary" : "hover:bg-surface-variant text-on-surface-variant"}`}
                      >
                        {pageNumber}
                      </button>
                    );
                  },
                )}
                <button
                  type="button"
                  onClick={() =>
                    setRequest((prev) => ({
                      ...prev,
                      page: Math.min(meta.totalPages, meta.page + 1),
                    }))
                  }
                  disabled={meta.page >= meta.totalPages}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant text-on-surface-variant transition-colors disabled:opacity-50"
                >
                  <span className="material-symbols-outlined">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
