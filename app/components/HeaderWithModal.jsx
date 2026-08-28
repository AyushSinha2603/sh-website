"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "./Navbar";

const ContactModal = dynamic(() => import('./ContactModal'), { ssr: false });

export default function HeaderWithModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Navbar onGetInTouchClick={() => setIsModalOpen(true)} />
      <ContactModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </>
  );
}
