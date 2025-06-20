import type { Account } from "@/types";
import AvataProfile from "./AvataProfile";
import CoverImage from "./CoverImage";
import { Button } from "../ui/button";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";

type Props = {
  account?: Account | null;
};

const HeaderProfile = ({ account }: Props) => {
  return (
    <div className="bg-background relative">
      {/* Cover Image */}
      <CoverImage
        ratio={10 / 3}
        src="https://res.cloudinary.com/didxuklgy/image/upload/v1750404835/2461928_125_r9gdcb.svg"
      />

      {/* Avatar */}
      <div className="relative flex w-full">
        <div className="absolute bottom-0 md:right-0 left-4 md:left-0">
          <AvataProfile className=" h-20 w-20 md:h-40 md:w-40 rounded-full border-4 border-background bg-background shadow-md mx-auto" />
        </div>
        <div className="flex md:mt-4 ml-auto md:h-16 z-10">
          <Button variant={"main"}>Follow</Button>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <EllipsisVertical
                height={"36px"}
                className="text-secondary cursor-pointer"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white border-none shadow h-10 md:w-40"
            >
              <DropdownMenuItem className="text-text  focus:bg-background">
                Report Abuse
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex flex-col mt-4 items-center justify-center">
        <h1 className="text-xl md:text-3xl font-bold ">
          {`${account?.firstName} ${account?.lastName}`}
        </h1>
        {account?.bio ? (
          <h3>{account.bio}</h3>
        ) : (
          <div className="mt-4">
            <Badge
              variant={"outline"}
              className="cursor-pointer hover:text-secondary"
            >
              Thêm bio
            </Badge>
          </div>
        )}

        <p>{account?.createdDate}</p>
        <p>{account?.createdDate}</p>
        <p>{account?.createdDate}</p>
        <p>{account?.createdDate}</p>
      </div>

      {/* Spacer */}
      <div className="h-20 md:h-28" />
    </div>
  );
};

// import type { Account } from "@/types";
// import AvataProfile from "./AvataProfile";
// import CoverImage from "./CoverImage";
// import { Button } from "../ui/button";
// import { EllipsisVertical } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu";

// type Props = {
//   account?: Account | null;
// };

// const HeaderProfile = ({ account }: Props) => {
//   return (
//     <div className="bg-background">
//       {/* Cover Image */}
//       <CoverImage
//         ratio={10 / 3}
//         src="https://res.cloudinary.com/didxuklgy/image/upload/v1750404835/2461928_125_r9gdcb.svg"
//       />

//       <div className="md:flex z-1 px-4">
//         {/* Avatar */}
//         <div className="relative md:w-40 -top-10 md:-top-20 ml-0 md:mx-auto">
//           <AvataProfile className="h-30 w-30 md:h-40 md:w-40 rounded-full border-4 border-background bg-background shadow-md" />
//         </div>

//         {/* Info and Action */}
//         <div className="flex flex-col gap-2 mt-2 w-full">
//           {/* Actions: Follow + Report */}
//           <div className="flex justify-between md:justify-end">
//             <Button variant="main">Follow</Button>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <EllipsisVertical
//                   height="36px"
//                   className="text-secondary cursor-pointer ml-2"
//                 />
//               </DropdownMenuTrigger>
//               <DropdownMenuContent
//                 align="end"
//                 className="bg-white border-none shadow h-10 md:w-40"
//               >
//                 <DropdownMenuItem className="focus:bg-background">
//                   Report Abuse
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>

//           {/* Info */}
//           <div className="mt-2">
//             <h1 className="text-xl md:text-3xl font-bold">
//               {`${account?.firstName} ${account?.lastName}`}
//             </h1>
//             <p>{account?.createdDate}</p>
//             <p>{account?.createdDate}</p>
//             <p>{account?.createdDate}</p>
//             <p>{account?.createdDate}</p>
//           </div>
//         </div>
//       </div>

//       {/* Spacer */}
//       <div className="h-20 md:h-28" />
//     </div>
//   );
// };

export default HeaderProfile;
