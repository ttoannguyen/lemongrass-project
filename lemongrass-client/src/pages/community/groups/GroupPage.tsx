import { useParams } from "react-router-dom";
import {
  useCheckJoinGroup,
  useGroupIdQuery,
} from "@/hooks/queries/useGroupQuery";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useJoinGroup, useLeaveGroup } from "@/hooks/queries/useGroupMutations";

const GroupPage = () => {
  const { groupId } = useParams<{ groupId: string }>();

  const { data, isLoading, isError } = useGroupIdQuery(groupId || "");
  const {
    data: isJoin,
    isLoading: isCheckLoading,
    refetch: refetchCheckJoin,
  } = useCheckJoinGroup(groupId || "");

  const join = useJoinGroup();
  const leave = useLeaveGroup();

  const handleJoinClick = (id: string) => {
    join.mutate(id, {
      onSuccess: () => {
        refetchCheckJoin();
      },
    });
  };

  const handleLeaveClick = (id: string) => {
    leave.mutate(id, {
      onSuccess: () => {
        refetchCheckJoin(); // cập nhật lại trạng thái isJoin
      },
    });
  };

  if (!groupId) return <div className="p-4">Không tìm thấy nhóm.</div>;
  if (isLoading) return <GroupPageSkeleton />;
  if (isError)
    return <div className="p-4 text-red-500">Đã xảy ra lỗi khi tải nhóm.</div>;
  if (!data) return <div className="p-4">Không có dữ liệu nhóm.</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{data.name}</h1>
          <p className="text-sm text-gray-500">ID: {data.groupId}</p>
        </div>

        {!isCheckLoading &&
          (isJoin ? (
            <Button
              variant="destructive"
              onClick={() => handleLeaveClick(data.groupId)}
              disabled={leave.isPending}
            >
              {leave.isPending ? "Đang rời nhóm..." : "Rời nhóm"}
            </Button>
          ) : (
            <Button
              onClick={() => handleJoinClick(data.groupId)}
              variant="outline"
              disabled={join.isPending}
            >
              {join.isPending ? "Đang tham gia..." : "Tham gia nhóm"}
            </Button>
          ))}
      </div>

      {data.description && (
        <p className="text-gray-700 leading-relaxed">{data.description}</p>
      )}

      <div className="flex gap-6 text-sm text-gray-600">
        <span>Thành viên: {data.memberCount}</span>
        <span>Chủ sở hữu: {data.ownerName}</span>
        <span>Riêng tư: {data.visibility === "PRIVATE" ? "Có" : "Không"}</span>
      </div>

      {/* Placeholder cho post list / member list */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Bài viết gần đây</h2>
        <div className="border rounded p-4 text-gray-400 italic">
          Chưa có bài viết nào.
        </div>
      </div>
    </div>
  );
};

export default GroupPage;

const GroupPageSkeleton = () => (
  <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
    <div className="flex items-center justify-between">
      <div>
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-32 mt-1" />
      </div>
      <Skeleton className="h-8 w-24" />
    </div>
    <Skeleton className="h-16 w-full" />
    <div className="flex gap-6">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-24" />
    </div>
  </div>
);
