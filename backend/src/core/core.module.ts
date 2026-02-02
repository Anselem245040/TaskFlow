import { Global, Module } from '@nestjs/common';
import { ConfigModule} from '@nestjs/config'
import { DatabaseModule } from './database/database.module';
import databaseConfig from 'src/config/database.config';

const ENV = process.env.NODE_ENV;

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [ !ENV ? '.env' : `.env.${ENV}` ],
      cache: true,
      expandVariables: true,
      load: [databaseConfig]
    }),
        DatabaseModule,
    ],
    exports: [
        DatabaseModule,
        ConfigModule
    ]
})
export class CoreModule {

}
