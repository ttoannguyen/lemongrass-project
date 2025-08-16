// import { Heart, MessageCircle } from "lucide-react";
// import { type PostResponse } from "@/types/post/PostResponse";
// import { format, formatDistanceToNow } from "date-fns";
// import { Link } from "react-router-dom";

// const PostCard = ({ post }: { post: PostResponse }) => {
//   const {
//     author,
//     title,
//     content,
//     images,
//     createdDate,
//     likeCount,
//     commentCount,
//   } = post;
//   const formattedDate = format(new Date(createdDate), "MMM d yyyy");
//   const relativeTime = formatDistanceToNow(new Date(createdDate), {
//     addSuffix: true,
//   });

//   console.log(images);
//   const isLessThanOneDay = (date: Date) => {
//     const now = new Date();
//     const diffInMs = now.getTime() - date.getTime();
//     const diffInHours = diffInMs / (1000 * 60 * 60);
//     return diffInHours < 24;
//   };

//   const capitalizeFirstLetter = (str: string) =>
//     str.charAt(0).toUpperCase() + str.slice(1);

//   return (
//     <div className="bg-white w-100 rounded-xl shadow p-4 space-y-2">
//       <div className="flex items-center gap-3">
//         <img
//           src={author.profilePictureUrl}
//           alt={author.username}
//           className="w-10 h-10 rounded-full object-cover"
//         />
//         <div>
//           <Link
//             to={`/account/${author.id}`}
//             className="font-semibold text-headline hover:underline"
//           >
//             {author.firstName + " " + author.lastName}
//           </Link>
//           <p className="text-[10px] text-paragraph/50 ">
//             {capitalizeFirstLetter(
//               isLessThanOneDay(new Date(createdDate))
//                 ? relativeTime
//                 : formattedDate
//             )}
//           </p>
//         </div>
//       </div>

//       <h1 className="text-headline font-semibold text-3xl whitespace-pre-line">{title}</h1>
//       <p className="text-gray-800 whitespace-pre-line">{content}</p>

//       {images && (
//         <img
//           src={images[0].url}
//           // src="a"
//           alt="Ảnh bài viết"
//           className="w-full rounded-md object-cover"
//         />
//       )}

//       <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
//         <div className="flex items-center gap-1">
//           <Heart size={16} /> {likeCount}
//         </div>
//         <div className="flex items-center gap-1">
//           <MessageCircle size={16} /> {commentCount}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostCard;
import { Heart, MessageCircle } from "lucide-react";
import { type PostResponse } from "@/types/post/PostResponse";
import { format, formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

const PostCard = ({ post }: { post: PostResponse }) => {
  const {
    author,
    title,
    contents,
    createdDate,
    likeCount,
    commentCount,
  } = post;

  const formattedDate = format(new Date(createdDate), "MMM d yyyy");
  const relativeTime = formatDistanceToNow(new Date(createdDate), {
    addSuffix: true,
  });

  const isLessThanOneDay = (date: Date) => {
    const diffInHours = (Date.now() - date.getTime()) / (1000 * 60 * 60);
    return diffInHours < 24;
  };

  const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);



  return (
    <div className="bg-white rounded-none shadow overflow-hidden">
      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <img
            src={author.profilePictureUrl}
            alt={author.username}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <Link
              to={`/account/${author.id}`}
              className="font-semibold hover:underline"
            >
              {author.firstName + " " + author.lastName}
            </Link>
            <p className="text-[10px] text-gray-500">
              {capitalizeFirstLetter(
                isLessThanOneDay(new Date(createdDate))
                  ? relativeTime
                  : formattedDate
              )}
            </p>
          </div>
        </div>

        <h1 className="font-semibold text-xl">{title}</h1>

        {contents?.map((c, idx) => (
          <div key={idx} className="space-y-2">
            {c.contentTitle && <h2 className="font-medium">{c.contentTitle}</h2>}
            {c.text && <p className="text-gray-800">{c.text}</p>}
            {c.imageResponse?.url && (
              <img
                src={c.imageResponse.url}
                alt=""
                className="w-full object-cover"
              />
            )}
          </div>
        ))}

        <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
          <div className="flex items-center gap-1">
            <Heart size={16} /> {likeCount}
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle size={16} /> {commentCount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
