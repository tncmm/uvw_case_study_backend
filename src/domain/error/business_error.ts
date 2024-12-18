import { HttpCodes } from '../../constant/http_codes';
import { UVWCaseStudyError } from './uvw_case_study_error';

export class BusinessError extends UVWCaseStudyError {
  constructor(message: string, errorCode?: number) {
    super(message, HttpCodes.BadRequest, errorCode);
  }
}