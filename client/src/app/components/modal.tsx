import React from "react";

const modalStyles: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalContentStyles: React.CSSProperties = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  minWidth: "300px",
  position: "relative",
};

const closeButtonStyles: React.CSSProperties = {
  position: "absolute",
  top: "10px",
  right: "10px",
  cursor: "pointer",
  border: "none",
  background: "none",
  fontSize: "18px",
};

const Modal = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => {
  return (
    <div style={modalStyles} onClick={onClose}>
      <div style={modalContentStyles} onClick={(e) => e.stopPropagation()}>
        <button style={closeButtonStyles} onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
