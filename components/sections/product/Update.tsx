"use client";

import React, { useState } from "react";
import ModalForm from "./ModalForm";

type Props = {
  productId: number;
};

const UpdateProduct = ({ productId }: Props) => {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleOpenModal = async () => {
    setOpen(true);
    setLoading(true);

    try {
      const response = await fetch(`/api/products/${productId}`);
      const result = await response.json();

      if (response.ok) {
        setProduct(result.data);
      } else {
        console.error(result.message || "Không thể tải chi tiết sản phẩm");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
    setProduct(null);
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="p-2 text-on-surface-variant hover:text-secondary hover:bg-secondary-container/20 rounded-full transition-all"
      >
        <span className="material-symbols-outlined">edit</span>
      </button>
      {open && !loading && product && (
        <ModalForm onClose={handleCloseModal} mode="edit" product={product} />
      )}
    </>
  );
};

export default UpdateProduct;
