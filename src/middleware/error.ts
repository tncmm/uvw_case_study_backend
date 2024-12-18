import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { UVWCaseStudyError } from '../domain/error/uvw_case_study_error';
import { HttpCodes } from '../constant/http_codes';

const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  const { apiError, httpStatus } = getApiError(err, req);
  res.status(httpStatus).send(apiError);
};

function getApiError(err: any, req: Request) {
  const apiError = {
    isError: true,
    success: {},
    error: {
      code: 0,
      message: '',
    },
  };

  let httpStatus: number = HttpCodes.InternalServerError;

  if (err instanceof UVWCaseStudyError) {
    const thrownError = err as UVWCaseStudyError;
    httpStatus = thrownError.status;

    apiError.error.code = thrownError.businessErrorCode;
    apiError.error.message = thrownError.message;

    return { apiError, httpStatus };
  }

  apiError.error.message = err.message;
  return { apiError, httpStatus };
}

export default errorMiddleware;
