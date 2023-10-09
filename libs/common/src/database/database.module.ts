import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forRootAsync({
        useFactory: (configService: ConfigService) => ({
            uri: configService.get('mongo_url') // Corrected key: 'mongo_url'
        }),
        inject: [ConfigService]
    })]
})
export class DatabaseModule {
    static forFeature(models: ModelDefinition[]){
        return MongooseModule.forFeature(models);
    }
}
