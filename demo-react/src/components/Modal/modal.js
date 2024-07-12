import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./modal.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export const Modal = ({ children }) => {
  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">{children}</div>
        </div>
      </div>
    </>
  );
};
