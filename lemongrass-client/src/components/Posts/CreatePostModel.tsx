import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../ui/dialog";
import PostForm from "./PostForm";

type Props = {
  onClose: () => void;
};

export const CreatePostModal = ({ onClose }: Props) => {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Tạo bài viết mới</DialogTitle>
        </DialogHeader>
        <PostForm onSuccess={onClose} />
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
};
