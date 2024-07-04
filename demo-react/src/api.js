const LIST_DATA = [
  { name: "Toán", author: "BGD", SX: "2022" },
  { name: "Toán 2", author: "BGD", SX: "2023" },
  { name: "Toán 3", author: "BGD", SX: "2024" },
  { name: "Toán 4", author: "BGD", SX: "2024" },
  { name: "Toán 5", author: "BGD", SX: "2024" },
  { name: "Toán 6", author: "BGD", SX: "2024" },
  { name: "Toán 7", author: "BGD", SX: "2024" },
  { name: "Toán 8", author: "BGD", SX: "2024" },
  { name: "Toán 9", author: "BGD", SX: "2024" },
  { name: "Toán 10", author: "BGD", SX: "2024" },
  { name: "Toán 11", author: "BGD", SX: "2024" },
  { name: "Toán 12", author: "BGD", SX: "2024" },
  { name: "Toán ĐH", author: "BGD", SX: "2024" },
  { name: "Toán CC", author: "BGD", SX: "2024" },
  { name: "Toán NC", author: "BGD", SX: "2024" },
  { name: "Văn", author: "BGD", SX: "2022" },
  { name: "Văn 2", author: "BGD", SX: "2023" },
  { name: "Văn 3", author: "BGD", SX: "2024" },
  { name: "Anh", author: "BGD", SX: "2022" },
  { name: "Anh 2", author: "BGD", SX: "2023" },
  { name: "Anh 3", author: "BGD", SX: "2024" },
  { name: "Lí", author: "BGD", SX: "2024" },
  { name: "Hóa", author: "BGD", SX: "2024" },
  { name: "Sinh", author: "BGD", SX: "2024" },
  { name: "Sử", author: "BGD", SX: "2024" },
  { name: "Địa", author: "BGD", SX: "2024" },
  { name: "Công nghệ", author: "BGD", SX: "2024" },
  { name: "Công dân", author: "BGD", SX: "2024" },
]; // dữ liệu từ api có dạng này

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
