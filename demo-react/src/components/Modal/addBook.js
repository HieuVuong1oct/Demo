import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./modal.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
export const AddBook = ({
  handleAdd,
  toggleModal,
  showModal,
  name,
  setName,
  author,
  setAuthor,
  SX,
  setSX,
  handleAddBook,
}) => {
  const isFormValid = () => {
    return name && author && SX && !isNaN(SX) && Number(SX) > 0;
  };

  return (
    <>
      <div>
        <button type="button" className="btn btn-primary" onClick={handleAdd}>
          <i className="fas fa-plus"></i>
        </button>
        {showModal && (
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Sách</h5>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="bookName">Tên sách</label>
                      <input
                        type="text"
                        className="form-control"
                        id="bookName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nhập tên sách"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="authorName">Tên tác giả</label>
                      <input
                        type="text"
                        className="form-control"
                        id="authorName"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Nhập tên tác giả"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="publishYear">Năm sản xuất</label>
                      <input
                        type="number"
                        className="form-control"
                        id="publishYear"
                        value={SX}
                        onChange={(e) => setSX(e.target.value)}
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
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
