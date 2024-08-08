import { HttpStatus } from "@nestjs/common";

export class BaseResponse {
    protected data: object;
    protected message: string;
    protected status: number;
    protected result: number;
    protected error: object;
    constructor(data: object=null, message= '', status: number = HttpStatus.OK, result= 0, error= null) {
        this.data = data;
        this.message = message;
        this.status = status;
        this.result = result;
        this.error = error;
    }
}