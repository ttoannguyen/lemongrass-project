import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../ui/dialog";
import PostForm from "../posts/PostForm";

type Props = {
  onClose: () => void;
};

export const CreatePostModal = ({ onClose }: Props) => {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto bg-background">
        <DialogHeader>
          <DialogTitle className="text-headline">Tạo bài đăng mới</DialogTitle>
        </DialogHeader>
        <PostForm onSuccess={onClose} />
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
};
