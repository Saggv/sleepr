import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { UserDto } from "../dto";

const getCurrentContextByUser = (context: ExecutionContext): UserDto =>{
    return context.switchToHttp().getRequest().user;
}

export const CurrentUser = createParamDecorator(
    (data: unknown, context: ExecutionContext) => getCurrentContextByUser(context)
)