const PendingContentList = () => {
  return (
    <ul className="space-y-2">
      PendingContentList
      {/* {items.map((item) => (
        <li
          key={item.id}
          className="p-3 bg-white shadow rounded flex justify-between items-center"
        >
          <div>
            <p className="font-medium">{item.title}</p>
            <p className="text-xs text-gray-500">Loại: {item.type}</p>
          </div>
          <button className="text-sm px-4 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200">
            Xem & Duyệt
          </button>
        </li>
      ))} */}
    </ul>
  );
};

export default PendingContentList;
