// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
// import { toast } from "sonner";
// import { Loader2 } from "lucide-react";
// import { Visibility } from "@/types/enums/visibility.enum";
// import type { GroupCreateRequest } from "@/types/group/GroupCreateRequest";
// import useCreateGroup from "@/hooks/useCreateGroup";
// import { useSubmitGroup } from "@/hooks/queries/useSubmitGroup";

// type Props = {
//   onSuccess?: () => void;
// };

// const CreateGroupForm = ({ onSuccess }: Props) => {
//   const {
//     name,
//     setName,
//     description,
//     setDescription,
//     setVisibility,
//     visibility,
//     requirePostApproval,
//     setRequirePostApproval,
//   } = useCreateGroup();

//   const { mutateAsync: submitGroupMutation, isPending } = useSubmitGroup();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!name.trim()) {
//       toast.error("Vui lòng nhập tên nhóm.");
//       return;
//     }

//     const payload: GroupCreateRequest = {
//       name,
//       description,
//       visibility,
//       requirePostApproval,
//     };

//     try {
//       await submitGroupMutation(payload);
//       toast.success("Tạo nhóm thành công!");
//       if (onSuccess) onSuccess();
//     } catch (err) {
//       const msg =
//         err instanceof Error ? err.message : "Đã xảy ra lỗi không xác định.";
//       toast.error(msg);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-5">
//       <h2 className="text-xl font-semibold">Tạo nhóm mới</h2>

//       <div className="space-y-1.5">
//         <Label htmlFor="name">Tên nhóm</Label>
//         <Input
//           id="name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Nhập tên nhóm..."
//           required
//         />
//       </div>

//       <div className="space-y-1.5">
//         <Label htmlFor="description">Mô tả</Label>
//         <Textarea
//           id="description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Mô tả ngắn gọn về nhóm..."
//         />
//       </div>

//       <div className="flex items-center justify-between">
//         <Label htmlFor="approval">Yêu cầu duyệt bài viết</Label>
//         <Switch
//           id="approval"
//           checked={requirePostApproval}
//           onCheckedChange={setRequirePostApproval}
//         />
//       </div>

//       <div className="space-y-1.5">
//         <Label htmlFor="visibility">Chế độ hiển thị</Label>
//         <select
//           id="visibility"
//           className="w-full border rounded p-2 text-sm"
//           value={visibility}
//           onChange={(e) => setVisibility(e.target.value as Visibility)}
//         >
//           <option value="PUBLIC">Công khai</option>
//           <option value="PRIVATE">Riêng tư</option>
//         </select>
//       </div>

//       <div className="flex gap-3 pt-2">
//         <Button
//           type="submit"
//           className=" bg-primary text-white"
//           disabled={isPending}
//         >
//           {isPending ? (
//             <>
//               <Loader2 className="w-4 h-4 animate-spin mr-2" />
//               Đang tạo...
//             </>
//           ) : (
//             "Tạo nhóm"
//           )}
//         </Button>
//         {onSuccess && (
//           <Button
//             type="button"
//             variant="outline"
//             onClick={onSuccess}
//             disabled={isPending}
//             className=""
//           >
//             Hủy
//           </Button>
//         )}
//       </div>
//     </form>
//   );
// };

// export default CreateGroupForm;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Visibility } from "@/types/enums/visibility.enum";
import type { GroupCreateRequest } from "@/types/group/GroupCreateRequest";
import useCreateGroup from "@/hooks/useCreateGroup";
import { useSubmitGroup } from "@/hooks/queries/useSubmitGroup";

type Props = {
  onSuccess?: () => void;
};

const CreateGroupForm = ({ onSuccess }: Props) => {
  const {
    name,
    setName,
    description,
    setDescription,
    visibility,
    setVisibility,
    requirePostApproval,
    setRequirePostApproval,
  } = useCreateGroup();

  const { mutateAsync: submitGroupMutation, isPending } = useSubmitGroup();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Vui lòng nhập tên nhóm.");
      return;
    }

    const payload: GroupCreateRequest = {
      name,
      description,
      visibility,
      requirePostApproval,
    };

    try {
      await submitGroupMutation(payload);
      toast.success("Tạo nhóm thành công!");
      onSuccess?.();
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Đã xảy ra lỗi không xác định.";
      toast.error(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-2">
      <div className="space-y-2">
        <Label htmlFor="name">Tên nhóm</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nhập tên nhóm..."
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Mô tả</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Mô tả ngắn gọn về nhóm..."
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="approval">Yêu cầu duyệt bài viết</Label>
        <Switch
          id="approval"
          checked={requirePostApproval}
          onCheckedChange={setRequirePostApproval}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="visibility">Chế độ hiển thị</Label>
        <select
          id="visibility"
          className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          value={visibility}
          onChange={(e) => setVisibility(e.target.value as Visibility)}
        >
          <option value="PUBLIC">Công khai</option>
          <option value="PRIVATE">Riêng tư</option>
        </select>
      </div>

      <div className="flex justify-end gap-3 pt-3">
        <Button
          type="submit"
          className="bg-primary text-white"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Đang tạo...
            </>
          ) : (
            "Tạo nhóm"
          )}
        </Button>
        {onSuccess && (
          <Button
            type="button"
            variant="outline"
            onClick={onSuccess}
            disabled={isPending}
          >
            Hủy
          </Button>
        )}
      </div>
    </form>
  );
};

export default CreateGroupForm;
