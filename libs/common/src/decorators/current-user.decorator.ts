import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { UserDto } from "../dto";

const getCurrentContextByUser = (context: ExecutionContext): UserDto =>{
    if(context.getType() == 'http'){
        return context.switchToHttp().getRequest().user;
    }

    const user = context.getArgs()[2]?.req.headers?.user;
    console.log('current user', context.getArgs()[2]?.req.headers);
    if (user) {
      return JSON.parse(user);
    }
}

export const CurrentUser = createParamDecorator(
    (data: unknown, context: ExecutionContext) => getCurrentContextByUser(context)
)