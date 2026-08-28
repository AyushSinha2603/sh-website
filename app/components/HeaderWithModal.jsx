"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import ContactModal from "./ContactModal";

export default function HeaderWithModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Navbar onGetInTouchClick={() => setIsModalOpen(true)} />
      <ContactModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </>
  );
}
