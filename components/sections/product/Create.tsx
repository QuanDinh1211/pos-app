"use client";

import React, { useState } from "react";
import ModalForm from "./ModalForm";

const CreateProduct = () => {
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container px-6 py-3 rounded-full flex items-center gap-2 shadow-lg active:scale-[0.98] transition-all duration-200"
      >
        <span className="material-symbols-outlined">add</span>
        <span className="font-label-lg text-label-lg">Thêm sản phẩm mới</span>
      </button>
      {open && <ModalForm onClose={handleCloseModal} mode="create" />}
    </>
  );
};

export default CreateProduct;
