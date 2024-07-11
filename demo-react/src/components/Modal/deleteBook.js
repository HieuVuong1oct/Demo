import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const DeleteBook = ({
  showConfirm,
  handleCancelDelete,
  handleConfirmDelete,
}) => {
  return (
    <>
      {showConfirm && (
        <div>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Cảnh báo</h5>
              
                </div>
                <div className="modal-body">
                  <p>Bạn có muốn xóa không?</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleCancelDelete}
                  >
                    Không xóa
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleConfirmDelete}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
