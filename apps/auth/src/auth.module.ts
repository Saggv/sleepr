import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoggerModule } from '@app/common';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { LocalStrategry } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt-strategy';

@Module({
  imports: [UsersModule, LoggerModule,
  JwtModule.registerAsync({
    useFactory: (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: {
        expiresIn: `${configService.get('JWT_EXPIRATION')}s`
      }
    }),
    inject: [ConfigService]
  }),
  ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      mongo_url: Joi.string().required(),
      JWT_SECRET: Joi.string().required(),
      JWT_EXPIRATION: Joi.string().required(),
      HTTP_PORT: Joi.string().required(),
      TCP_PORT: Joi.string().required(),
    })
  })  
 ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategry, JwtStrategy ] })
export class AuthModule {}
