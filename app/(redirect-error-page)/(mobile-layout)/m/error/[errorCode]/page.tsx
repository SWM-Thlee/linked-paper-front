export default function Page({ params }: { params: { errorCode: string } }) {
  if (params.errorCode === "400") {
    return "400 Bad Request";
  }

  if (params.errorCode === "500") {
    return "500 Internal Server Error";
  }

  return "Unknown Error";
}
