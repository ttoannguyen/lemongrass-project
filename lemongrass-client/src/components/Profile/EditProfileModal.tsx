import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import type { Account } from "@/types";
import { useUpdateMyProfileMutation } from "@/hooks/queries/useUpdateMyProfileMutation";
import { Camera } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

type Props = {
  open: boolean;
  onClose: () => void;
  account: Account;
};

const EditProfileModal = ({ open, onClose, account }: Props) => {
  const [firstName, setFirstName] = useState(account.firstName);
  const [lastName, setLastName] = useState(account.lastName);
  const [dob, setDob] = useState(account.dob ?? "");
  const [address, setAddress] = useState(account.address ?? "");
  const [bio, setBio] = useState(account.bio ?? "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    account.profilePictureUrl || null
  );
  const { reload } = useAuth();

  const updateProfileMutation = useUpdateMyProfileMutation();

  useEffect(() => {
    if (avatarFile) {
      const previewUrl = URL.createObjectURL(avatarFile);
      setAvatarPreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [avatarFile]);

  const handleSave = async () => {
    const data = { firstName, lastName, dob, address, bio };
    await updateProfileMutation.mutateAsync({ data, avatar: avatarFile });
    await reload();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg rounded-xl shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Chỉnh sửa trang cá nhân
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="relative w-32 h-32">
              <img
                src={avatarPreview || "/default-avatar.png"}
                alt="avatar"
                className="w-full h-full rounded-full object-cover border border-gray-300"
              />
              <label htmlFor="avatarUpload">
                <div className="absolute bottom-0 right-0 bg-black/50 rounded-full p-1 cursor-pointer">
                  <Camera size={18} className="text-white" />
                </div>
              </label>
              <input
                id="avatarUpload"
                type="file"
                accept="image/*"
                onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
                className="hidden"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Họ</Label>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <Label>Tên</Label>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label>Ngày sinh</Label>
              <Input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>

            <div>
              <Label>Địa chỉ</Label>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <Label>Giới thiệu</Label>
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="ghost" onClick={onClose}>
              Hủy
            </Button>
            <Button
              onClick={handleSave}
              disabled={updateProfileMutation.isPending}
            >
              {updateProfileMutation.isPending ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
