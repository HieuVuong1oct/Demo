import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./modal.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Modal } from "./modal";
export const AddBook = ({
  handleAdd,
  toggleModal,
  showModal,
  handleAddBook,
  infoItem,
  setInfoItem,
}) => {
  const isFormValid = () => {
    return (
      infoItem.name &&
      infoItem.author &&
      infoItem.SX &&
      !isNaN(infoItem.SX) &&
      Number(infoItem.SX) > 0
    );
  };

  return (
    <>
      <div>
        <button type="button" className="btn btn-primary" onClick={handleAdd}>
          <i className="fas fa-plus"></i>
        </button>
        {showModal && (
          <Modal>
            <div className="modal-header">
              <h5 className="modal-title">Sách</h5>
            </div>
            <div className="modal-body">
              <form autocomplete="off">
                <div className="form-group">
                  <label htmlFor="bookName">Tên sách</label>
                  <input
                    type="text"
                    className="form-control"
                    id="bookName"
                    value={infoItem.name}
                    onChange={(e) =>
                      setInfoItem({ ...infoItem, name: e.target.value })
                    }
                    placeholder="Nhập tên sách"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="authorName">Tên tác giả</label>
                  <input
                    type="text"
                    className="form-control"
                    id="authorName"
                    value={infoItem.author}
                    onChange={(e) =>
                      setInfoItem({ ...infoItem, author: e.target.value })
                    }
                    placeholder="Nhập tên tác giả"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="publishYear">Năm sản xuất</label>
                  <input
                    type="number"
                    className="form-control"
                    id="publishYear"
                    value={infoItem.SX}
                    onChange={(e) =>
                      setInfoItem({ ...infoItem, SX: e.target.value })
                    }
                    placeholder="Nhập năm sản xuất"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddBook}
                disabled={!isFormValid()}
              >
                Thêm sách
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={toggleModal}
              >
                Đóng
              </button>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};
