const LIST_DATA = [
  { id: 1, name: "Toán 2", author: "BGD", SX: "2023" },
  { id: 2, name: "Toán", author: "BGD", SX: "2022" },
  { id: 3, name: "Toán 3", author: "BGD", SX: "2024" },
  { id: 4, name: "Toán 4", author: "BGD", SX: "2024" },
  { id: 5, name: "Toán 5", author: "BGD", SX: "2024" },
  { id: 6, name: "Toán 6", author: "BGD", SX: "2024" },
  { id: 7, name: "Toán 7", author: "BGD", SX: "2024" },
  { id: 8, name: "Toán 8", author: "BGD", SX: "2024" },
  { id: 9, name: "Toán 9", author: "BGD", SX: "2024" },
  { id: 10, name: "Toán 10", author: "BGD", SX: "2024" },
  { id: 11, name: "Toán 11", author: "BGD", SX: "2024" },
  { id: 12, name: "Toán 12", author: "BGD", SX: "2024" },
  { id: 13, name: "Toán ĐH", author: "BGD", SX: "2024" },
  { id: 14, name: "Toán CC", author: "BGD", SX: "2024" },
  { id: 15, name: "Toán NC", author: "BGD", SX: "2024" },
  { id: 16, name: "Văn", author: "BGD", SX: "2022" },
  { id: 17, name: "Văn 2", author: "BGD", SX: "2023" },
  { id: 18, name: "Văn 3", author: "BGD", SX: "2024" },
  { id: 19, name: "Anh", author: "BGD", SX: "2022" },
  { id: 20, name: "Anh 2", author: "BGD", SX: "2023" },
  { id: 21, name: "Anh 3", author: "BGD", SX: "2024" },
  { id: 22, name: "Lí", author: "BGD", SX: "2024" },
  { id: 23, name: "Hóa", author: "BGD", SX: "2024" },
  { id: 24, name: "Sinh", author: "BGD", SX: "2023" },
  { id: 25, name: "Sử", author: "BGD", SX: "2023" },
  { id: 26, name: "Địa", author: "BGD", SX: "2022" },
  { id: 27, name: "Công nghệ", author: "BGD", SX: "2022" },
  { id: 28, name: "Công dân", author: "BGD", SX: "2022" },
]; // dữ liệu từ api có dạng này

export const addData = (newItem) => {
  const maxId = LIST_DATA.reduce(
    (max, item) => (item.id > max ? item.id : max),
    0
  );

  newItem.id = maxId + 1;
  LIST_DATA.push(newItem);
};

export const updateData = (id, item) => {
  const index = LIST_DATA.findIndex((item) => item.id === id);
  LIST_DATA[index] = { ...LIST_DATA[index], ...item };
};

export const deleteData = (id) => {
  const index = LIST_DATA.findIndex((item) => item.id === id);
  const listNew = LIST_DATA.splice(index, 1);
  return listNew;
};
function sortList(list, sortBy, sortKey) {
  return list.sort((a, b) => {
    if (a[sortKey] < b[sortKey]) {
      return sortBy === "asc" ? -1 : 1;
    } else if (a[sortKey] > b[sortKey]) {
      return sortBy === "asc" ? 1 : -1;
    } else {
      return 0;
    }
  });
}

const getData = ({
  searchKey,
  searchValue,
  sortBy,
  sortKey,
  pageActive,
  perPage,
}) => {
  let database = JSON.parse(JSON.stringify(LIST_DATA));

  // lay danh sach thoa man searchKey + searchValue
  database = database.filter((item) => item[searchKey].includes(searchValue));

  // sort danh sach theo sortBy va sortKey
  database = sortList(database, sortBy, sortKey);

  // phan trang theo perPage va tra ve pageActive
  const total = database.length;
  const totalPage = Math.ceil(total / perPage);

  const list = database.filter(
    (item, index) =>
      index >= (pageActive - 1) * perPage && index < pageActive * perPage
  );

  return {
    list,
    page: {
      totalPage,
      pageActive,
      perPage,
    },
  };
};

export { getData };

// init page => khởi tạo dữ liệu theo url => useEffect để sau khi láy hết dữ liệu từ url thì get list init về

// các hàm xử lý phân trang, chọn perpage, di chuyển giữa các page => vẫn gọi API

// khi bấm nút search => call API

// khi sort thì call API
