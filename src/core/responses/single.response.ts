import { HttpStatus } from "@nestjs/common";
import { BaseResponse } from "./base.response";

export class SingleResponse extends BaseResponse{
    constructor(data: object = {}, message = 'Success', status: HttpStatus.OK, result = 0, error = null) {
        super(data, message, status, result, error);
    }
}