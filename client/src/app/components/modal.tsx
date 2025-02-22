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

  borderRadius: "8px",
  minWidth: "350px",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  justifyItems:"center",
  alignItems: "center",
};

const closeButtonStyles: React.CSSProperties = {
  position: "absolute",
  top: "10px",
  right: "10px",
  cursor: "pointer",
  border: "none",
  background: "none",
  color:"red",
  fontSize: "32px",
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
