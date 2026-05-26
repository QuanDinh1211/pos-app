"use client";

import React, { useState } from "react";
import ModalForm from "./ModalForm";

const UpdateProduct = () => {
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
        className="p-2 text-on-surface-variant hover:text-secondary hover:bg-secondary-container/20 rounded-full transition-all"
      >
        <span className="material-symbols-outlined">edit</span>
      </button>
      {open && <ModalForm onClose={handleCloseModal} mode="edit" />}
    </>
  );
};

export default UpdateProduct;
