const ReportedContentList = () => {
  return (
    <ul className="space-y-2">
      Report
      {/* {reports.map((report) => (
        <li
          key={report.id}
          className="p-3 bg-white shadow rounded flex justify-between items-center"
        >
          <div>
            <p className="font-medium">Lý do: {report.reason}</p>
            <p className="text-xs text-gray-500">
              Người báo cáo: {report.reportedBy}
            </p>
          </div>
          <button className="text-sm px-4 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200">
            Xem báo cáo
          </button>
        </li>
      ))} */}
    </ul>
  );
};

export default ReportedContentList;
