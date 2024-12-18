import { HttpCodes } from '../../constant/http_codes';
import { UVWCaseStudyError } from './uvw_case_study_error';

export class Unauthorized extends UVWCaseStudyError {
  constructor(message: string, errorCode?: number) {
    super(message, HttpCodes.Unauthorized, errorCode);
  }
}