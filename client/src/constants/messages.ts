export const AUTH_MESSAGES = {
  REGISTER: {
    SUCCESS: "Registration successful. Please login.",
    FAILED: "Registration failed",
  },
  LOGIN: {
    SUCCESS: "Logged in successfully",
    FAILED: "Login failed",
  },
  LOGOUT: {
    SUCCESS: "Logged out successfully",
  },
  TOKEN: {
    REFRESH_SUCCESS: "Token refreshed successfully",
    REFRESH_FAILED: "Failed to refresh token",
    INVALID: "Invalid token",
  },
  VALIDATION: {
    NAME_REQUIRED: "Name is required",
    EMAIL_REQUIRED: "Email is required",
    EMAIL_INVALID: "Invalid email address",
    PASSWORD_REQUIRED: "Password is required",
  },
  USER: {
    NOT_FOUND: "User not found",
    ALREADY_EXISTS: "User already exists",
  },
} as const;

export const ERROR_COMMON_MESSAGES = {
  GENERAL: {
    SOMETHING_WRONG: "Something went wrong",
    SERVER_ERROR: "Internal server error",
    UNAUTHORIZED: "Unauthorized access",
    FORBIDDEN: "Access forbidden",
  },
  VALIDATION: {
    REQUIRED_FIELD: "This field is required",
    INVALID_FORMAT: "Invalid format",
  },
} as const;

export const SUCCESS_COMMON_MESSAGES = {
  GENERAL: {
    CREATED: "Created successfully",
    UPDATED: "Updated successfully",
    DELETED: "Deleted successfully",
  },
} as const;
