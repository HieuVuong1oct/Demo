import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const UpdateBook = ({
  toggleModal,
  showModal,
  name,
  setName,
  author,
  setAuthor,
  SX,
  setSX,
  handleUpdateBook,
}) => {
  return (
    <>
      <div>
        {showModal && (
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Sách</h5>
                </div>
                <div className="modal-body">
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                      <label htmlFor="bookName">Tên sách</label>
                      <input
                        type="text"
                        className="form-control"
                        id="bookName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nhập tên sách"
                        required
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
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="publishYear">Năm sản xuất</label>
                      <input
                        type="text"
                        className="form-control"
                        id="publishYear"
                        value={SX}
                        onChange={(e) => setSX(e.target.value)}
                        placeholder="Nhập năm sản xuất"
                        required
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={toggleModal}
                  >
                    Đóng
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleUpdateBook}
                  >
                    Cập nhật
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
