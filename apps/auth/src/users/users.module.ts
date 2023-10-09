import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from '@app/common';
import { UsersDocument, UsersSchema } from './models/users.schema';
import { UsersRepositoty } from './users.repositoty';


@Module({
  imports:[
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: UsersDocument.name,
        schema: UsersSchema
      }
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepositoty],
  exports: [UsersService]
})
export class UsersModule {}
