import PendingContentList from "@/components/staff/PendingContentList";
import ReportedContentList from "@/components/staff/ReportedContentList";

const ManageStaffWork = () => {
  //   const [pendingItems, setPendingItems] = useState([]);
  //   const [reports, setReports] = useState([]);

  //   useEffect(() => {
  //     // TODO: Replace with real API calls
  //     fetchPendingItems();
  //     fetchReports();
  //   }, []);

  //   const fetchPendingItems = async () => {
  //     // Mock data
  //     setPendingItems([
  //       { id: 1, title: "Bánh mì kẹp thịt", type: "recipe" },
  //       { id: 2, title: "Bài viết về ăn chay", type: "post" },
  //     ]);
  //   };

  //   const fetchReports = async () => {
  //     setReports([{ id: 1, reason: "Nội dung phản cảm", reportedBy: "user123" }]);
  //   };

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-bold mb-4">📝 Nội dung chờ duyệt</h2>
        <PendingContentList />
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">🚨 Báo cáo vi phạm</h2>
        <ReportedContentList />
      </section>
    </div>
  );
};

export default ManageStaffWork;
