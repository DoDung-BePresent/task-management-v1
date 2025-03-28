/**
 * Constants
 */
import { ErrorRequestHandler, Response } from "express";
import {
  ERROR_CODE_ENUM,
  ErrorCodeEnumType,
  STATUS_CODE,
  StatusCodeType,
} from "../constants/httpStatus";
import { z, ZodError } from "zod";

/**
 * Zod validation
 */
const formatZodError = (res: Response, error: z.ZodError) => {
  const errors = error?.issues?.map((err) => ({
    field: err.path.join("."),
    message: err.message,
  }));
  return res.status(STATUS_CODE.BAD_REQUEST).json({
    message: "Validation failed",
    errors: errors,
    errorCode: ERROR_CODE_ENUM.VALIDATION_ERROR,
  });
};

/**
 * Custom Error class
 */
class ApiError extends Error {
  statusCode: StatusCodeType;
  errorCode: ErrorCodeEnumType;

  constructor(
    message: string,
    statusCode: StatusCodeType,
    errorCode: ErrorCodeEnumType
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class HttpException extends ApiError {
  constructor(
    message = "Http Exception Error",
    statusCode: StatusCodeType,
    errorCode: ErrorCodeEnumType
  ) {
    super(message, statusCode, errorCode);
  }
}

export class InternalServerException extends ApiError {
  constructor(
    message = "Internal Server Error",
    errorCode?: ErrorCodeEnumType
  ) {
    super(
      message,
      STATUS_CODE.INTERNAL_SERVER_ERROR,
      errorCode || ERROR_CODE_ENUM.INTERNAL_SERVER_ERROR
    );
  }
}

export class NotFoundException extends ApiError {
  constructor(message = "Resource not found", errorCode?: ErrorCodeEnumType) {
    super(
      message,
      STATUS_CODE.NOT_FOUND,
      errorCode || ERROR_CODE_ENUM.RESOURCE_NOT_FOUND
    );
  }
}

export class BadRequestException extends ApiError {
  constructor(message = "Bad Request", errorCode?: ErrorCodeEnumType) {
    super(
      message,
      STATUS_CODE.BAD_REQUEST,
      errorCode || ERROR_CODE_ENUM.VALIDATION_ERROR
    );
  }
}

export class UnauthorizedException extends ApiError {
  constructor(message = "Unauthorized Access", errorCode?: ErrorCodeEnumType) {
    super(
      message,
      STATUS_CODE.UNAUTHORIZED,
      errorCode || ERROR_CODE_ENUM.ACCESS_UNAUTHORIZED
    );
  }
}

/**
 * Error Handler
 */

export const errorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
): any => {
  console.error(`Error Occurred on PATH: ${req.path} `, error);

  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      message: error.message,
      errorCode: error.errorCode,
    });
  }

  if (error instanceof ZodError) {
    return formatZodError(res, error);
  }

  return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
    error: error?.message || "Unknown error occurred",
  });
};
