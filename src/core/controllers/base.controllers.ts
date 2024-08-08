import { ErrorResponse } from "../responses/error.response";
import { SingleResponse } from "../responses/single.response"

export class BaseController{
    sendOkResponse(data: object = [], message = 'success', status: number = 200, result = 0, error = null): object{
        
        return new SingleResponse(data, message, status, result, error);
    }

    sendFailedResponse( message = 'error', status: number = 400, result = -1, error = null,data: object = []): object{
        return  new ErrorResponse(message, result, status, error,data);
    }
    
}