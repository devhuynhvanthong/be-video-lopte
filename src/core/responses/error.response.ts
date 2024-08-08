import { HttpStatus } from "@nestjs/common";
import { BaseResponse } from "./base.response";

export class ErrorResponse extends BaseResponse {
    constructor( message = 'Bad Request', status = HttpStatus.BAD_REQUEST, result = HttpStatus.BAD_REQUEST, error = {},data: object = {},) {
        super(data, message, status, result, error);
    }
}