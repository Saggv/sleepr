import { UnauthorizedException } from '@nestjs/common';
import { app } from './app';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_SERVICE } from '@app/common';
import { lastValueFrom } from 'rxjs';

export const authContext = async ({ req }) => {
  try {
    console.log("Hello")
    const authClient = app.get<ClientProxy>(AUTH_SERVICE);
    const user = await lastValueFrom(
      authClient.send('authenticate', {
        Authentication: req.headers?.authentication,
      }),
    );
    console.log("authContext", user);
    return { user };
  } catch (err) {
    throw new UnauthorizedException(err);
  }
};