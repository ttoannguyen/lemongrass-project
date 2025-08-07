import { useParams } from "react-router-dom";
import {
  useCheckJoinGroup,
  useGroupIdQuery,
} from "@/hooks/queries/useGroupQuery";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useJoinGroup, useLeaveGroup } from "@/hooks/queries/useGroupMutations";

const GroupHeader = () => {
  const { groupId } = useParams<{ groupId: string }>();

  const { data, isLoading } = useGroupIdQuery(groupId || "");
  const { data: isJoin, isLoading: isCheckLoading } = useCheckJoinGroup(
    groupId || ""
  );
  const join = useJoinGroup();
  const leave = useLeaveGroup();

  const handleJoinClick = () => {
    if (groupId) join.mutate(groupId);
  };

  const handleLeaveClick = () => {
    if (groupId) leave.mutate(groupId);
  };

  if (isLoading || !groupId) return <GroupHeaderSkeleton />;
  if (!data) return null;

  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div>
        <h1 className="text-2xl font-bold">{data.name}</h1>
        <div className="text-sm text-gray-500">
          {data.memberCount} thành viên • Chủ sở hữu: {data.ownerName}
        </div>
      </div>
      {!isCheckLoading && (
        <>
          {isJoin ? (
            <Button
              variant="destructive"
              onClick={handleLeaveClick}
              disabled={leave.isPending}
            >
              {leave.isPending ? "Đang rời nhóm..." : "Rời nhóm"}
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={handleJoinClick}
              disabled={join.isPending}
            >
              {join.isPending ? "Đang tham gia..." : "Tham gia nhóm"}
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default GroupHeader;

const GroupHeaderSkeleton = () => (
  <div className="flex items-center justify-between border-b pb-4">
    <div>
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-4 w-32 mt-1" />
    </div>
    <Skeleton className="h-8 w-24" />
  </div>
);
