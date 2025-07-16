import axios from "axios";

const extractErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    console.log(error.response?.data?.message);
    return (
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Lỗi không xác định"
    );
  }
  return "Lỗi không xác định";
};

export default extractErrorMessage;
