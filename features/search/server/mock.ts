// import { delay, random, repeat } from "@/utils/sample";
// import { UniversalResponse } from "@/utils/fetch-universally";

// import { Search } from "../types";
// import { searchResult } from "../utils/sample";

// export async function MockResult(info: Search.Query.Info) {
//   const result = await delay(2000, () => repeat(info.size, searchResult))();
//   const status = random(1, 10) >= 3 ? "OK" : "LAST_PAGE"; // 80%
//   const randomSuccess = random(1, 10) >= 3; // 80%

//   return (
//     randomSuccess
//       ? {
//           status: "OK",
//           data: {
//             ...info,
//             status,
//             count: info.size,
//             data: result,
//           },
//         }
//       : { status: "ERROR", errorCode: 500 }
//   ) satisfies UniversalResponse<Search.Api.Response>;
// }
