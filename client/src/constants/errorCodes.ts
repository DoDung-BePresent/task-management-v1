// TODO Cảm giác 2 file errorCodes với messages cứ bị rờm rà ý, chưa được tối ưu!

export const ERROR_CODES = {
  // Authentication
  AUTH_EMAIL_ALREADY_EXISTS: "AUTH_EMAIL_ALREADY_EXISTS",
  AUTH_INVALID_TOKEN: "AUTH_INVALID_TOKEN",
  AUTH_USER_NOT_FOUND: "AUTH_USER_NOT_FOUND",
  AUTH_NOT_FOUND: "AUTH_NOT_FOUND",
  AUTH_TOO_MANY_ATTEMPTS: "AUTH_TOO_MANY_ATTEMPTS",
  AUTH_UNAUTHORIZED_ACCESS: "AUTH_UNAUTHORIZED_ACCESS",
  AUTH_TOKEN_NOT_FOUND: "AUTH_TOKEN_NOT_FOUND",

  // Login specifics
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  ACCOUNT_DISABLED: "ACCOUNT_DISABLED", // For suspended accounts
  ACCOUNT_LOCKED: "ACCOUNT_LOCKED", // For temporarily locked accounts

  // Access Control
  ACCESS_UNAUTHORIZED: "ACCESS_UNAUTHORIZED",

  // General errors
  VALIDATION_ERROR: "VALIDATION_ERROR",
  RESOURCE_NOT_FOUND: "RESOURCE_NOT_FOUND",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

export const ERROR_MESSAGES = {
  // Authentication errors
  [ERROR_CODES.AUTH_EMAIL_ALREADY_EXISTS]: "Email is already in use",
  [ERROR_CODES.AUTH_INVALID_TOKEN]:
    "Your session has expired, please login again",
  [ERROR_CODES.AUTH_USER_NOT_FOUND]: "Account does not exist",
  [ERROR_CODES.AUTH_NOT_FOUND]: "Authentication information not found",
  [ERROR_CODES.AUTH_TOO_MANY_ATTEMPTS]:
    "Too many attempts, please try again later",
  [ERROR_CODES.AUTH_UNAUTHORIZED_ACCESS]: "Access denied",
  [ERROR_CODES.AUTH_TOKEN_NOT_FOUND]: "Authentication token not found",

  // Login specific errors
  [ERROR_CODES.INVALID_CREDENTIALS]: "Incorrect email or password",
  [ERROR_CODES.ACCOUNT_DISABLED]: "Account has been disabled by administrator",
  [ERROR_CODES.ACCOUNT_LOCKED]:
    "Account temporarily locked due to too many failed login attempts",

  // Access control
  [ERROR_CODES.ACCESS_UNAUTHORIZED]:
    "You don't have permission to perform this action",

  // General errors
  [ERROR_CODES.VALIDATION_ERROR]: "Invalid data",
  [ERROR_CODES.RESOURCE_NOT_FOUND]: "Resource not found",
  [ERROR_CODES.INTERNAL_SERVER_ERROR]: "System error, please try again later",
};
