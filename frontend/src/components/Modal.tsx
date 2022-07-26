import React from "react";
import ReactModal from "react-modal";
import { IconButton } from "./IconButton";

type ModalProps = ReactModal["props"] & {
  title: string;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ title, children, ...props }) => {
  return (
    <ReactModal
      shouldCloseOnEsc
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          zIndex: 1000,
          overflowY: "auto",
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          borderRadius: 8,
          padding: "40px 40px 40px 40px",
          transform: "translate(-50%, -50%)",
          backgroundColor: "var(--color-primary-900)",
          border: "none",
          width: "90%",
          maxWidth: 650,
        },
      }}
      {...props}
    >
      <div className="flex items-center justify-between">
        <span className="text-xl text-primary-100 font-bold">{title}</span>
        <IconButton icon="close" onClick={(e) => props?.onRequestClose?.(e)} />
      </div>
      <div className="mt-4">{children}</div>
    </ReactModal>
  );
};
