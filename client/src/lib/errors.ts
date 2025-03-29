import { ERROR_MESSAGES, ErrorCode } from "@/constants/errorCodes";

export const getErrorMessage = (
  errorCode: ErrorCode | undefined,
  fallbackMessage: string = "Đã xảy ra lỗi"
): string => {
  if (!errorCode) return fallbackMessage;
  return ERROR_MESSAGES[errorCode] || fallbackMessage;
};
