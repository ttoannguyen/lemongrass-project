import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { CommentResponse } from "@/types/comment/CommentResponse";
import {
  useCommentRecipeMutation,
  useGetCommentRecipeId,
  useDeleteCommentRecipeMutation,
} from "@/hooks/queries/useComment";
import { useAuth } from "@/contexts/AuthContext";
import { useAccountByUsername } from "@/hooks/queries/useAccountQuery";
import { Link } from "react-router-dom";

export default function RecipeComments({ recipeId }: { recipeId: string }) {
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const { account } = useAuth();

  const { data: comments = [], isLoading } = useGetCommentRecipeId(recipeId);
  const { mutate: addComment, isPending } = useCommentRecipeMutation();
  const { mutate: deleteComment } = useDeleteCommentRecipeMutation(recipeId);

  const handleSubmit = (text: string, parentId?: string) => {
    if (!text.trim() || !account) return;
    addComment({
      recipeId,
      accountId: account.id,
      content: text,
      parentCommentId: parentId,
    });
    setReplyTo(null);
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Bình luận</h2>

      {/* Input cho bình luận gốc */}
      <CommentInput
        onSubmit={(text) => handleSubmit(text)}
        loading={isPending}
        placeholder="Viết bình luận..."
      />

      {isLoading ? (
        <p className="text-gray-500">Đang tải...</p>
      ) : comments.length === 0 ? (
        <p className="text-gray-500">Chưa có bình luận.</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((c) => (
            <CommentItem
              key={c.id}
              c={c}
              replyTo={replyTo}
              onReply={setReplyTo}
              onDelete={deleteComment}
              onSubmit={handleSubmit}
              isPending={isPending}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
function CommentItem({
  c,
  replyTo,
  onReply,
  onDelete,
  onSubmit,
  isPending,
}: {
  c: CommentResponse;
  replyTo: string | null;
  onReply: (id: string | null) => void;
  onDelete: (id: string) => void;
  onSubmit: (text: string, parentId?: string) => void;
  isPending: boolean;
}) {
  const [showReplies, setShowReplies] = useState(false);
  const { account } = useAuth();
  const { data } = useAccountByUsername(c.username);

  return (
    <li className="flex gap-3">
      <img
        src={data?.profilePictureUrl ?? "/default-avatar.png"}
        alt={c.username}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex-1">
        <div className="bg-white shadow-sm rounded-xl p-3">
          <div className="flex items-center justify-between mb-1">
            <Link to={`/account/np${data?.id}`} className="font-semibold text-sm">{c.username}</Link>
            <span className="text-xs text-gray-400">
              {new Date(c.createdDate).toLocaleString()}
            </span>
          </div>
          <p className="text-sm text-gray-700">{c.content}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-4 text-xs text-gray-500 mt-1 ml-1">
          <button onClick={() => onReply(c.id)} className="hover:text-blue-500 transition">
            Trả lời
          </button>
          {account?.username === c.username && (
            <button onClick={() => onDelete(c.id)} className="hover:text-red-500 transition">
              Xóa
            </button>
          )}
          {c.replies?.length > 0 && (
            <button onClick={() => setShowReplies(!showReplies)} className="hover:text-gray-700 transition">
              {showReplies
                ? `Ẩn ${c.replies.length} trả lời`
                : `Xem ${c.replies.length} trả lời`}
            </button>
          )}
        </div>

        {replyTo === c.id && (
          <div className="mt-2 ml-12">
            <CommentInput
              onSubmit={(text) => {
                onSubmit(text, c.id);
                setShowReplies(true);
              }}
              loading={isPending}
              placeholder="Trả lời..."
              onCancel={() => onReply(null)}
            />
          </div>
        )}

        {showReplies && c.replies?.length > 0 && (
          <ul className="mt-2 ml-12 space-y-3">
            {c.replies.map((r) => (
              <CommentItem
                key={r.id}
                c={r}
                replyTo={replyTo}
                onReply={onReply}
                onDelete={onDelete}
                onSubmit={onSubmit}
                isPending={isPending}
              />
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

function CommentInput({
  onSubmit,
  loading,
  placeholder,
  onCancel,
}: {
  onSubmit: (text: string) => void;
  loading: boolean;
  placeholder: string;
  onCancel?: () => void;
}) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSubmit(text);
    setText("");
  };

  return (
    <div className="flex gap-2 my-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        className="flex-1 rounded-xl px-4 py-2 border border-gray-200 focus:border-blue-300 focus:ring-1 focus:ring-blue-300 text-sm bg-white shadow-sm transition"
      />
      <Button size="sm" disabled={!text.trim() || loading} onClick={handleSend}>
        Gửi
      </Button>
      {onCancel && (
        <Button size="sm" variant="ghost" onClick={onCancel}>
          Hủy
        </Button>
      )}
    </div>
  );
}