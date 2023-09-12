import { Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
// import "../styles/loading.css";

// function Loading() {
//   const dark = useSelector((state) => state.auth.darkMode);

//   return (
//     <div className="lds-ring">
//       <div></div>
//       <div></div>
//       <div></div>
//       <div></div>
//     </div>
//   );
// }

export default function Loading() {
  const dark = useSelector((state) => state.auth.darkMode);
  return (
    <div className="m-[2%]  flex justify-between gap-5">
      <div className="w-[20%]">
        <Skeleton
          sx={{ bgcolor: dark ? "#1C2833" : "#FDFEFE", borderRadius: "10px" }}
          variant="rectangular"
          // width={300}
          height={450}
        />
      </div>
      <div className="flex flex-col flex-1 gap-4">
        <Skeleton
          sx={{ bgcolor: dark ? "#1C2833" : "#FDFEFE", borderRadius: "10px" }}
          variant="rectangular"
          // width={510}
          // className="w-[20%]"
          height={118}
        />
        <Skeleton
          sx={{ bgcolor: dark ? "#1C2833" : "#FDFEFE", borderRadius: "10px" }}
          variant="rectangular"
          // width={210}
          height={550}
        />
      </div>
      <div className="w-[20%]">
        <Skeleton
          sx={{ bgcolor: dark ? "#1C2833" : "#FDFEFE", borderRadius: "10px" }}
          variant="rectangular"
          // width={300}
          height={450}
        />
      </div>
    </div>
  );
}

// <div
//   className={`${
//     dark ? "bg-slate-900" : "bg-gray-100"
//   } w-[20%] p-5 rounded-xl h-[390px]`}
// ></div>
