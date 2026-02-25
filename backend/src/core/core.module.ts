import { Global, Module } from '@nestjs/common';
import { ConfigModule} from '@nestjs/config'
import { DatabaseModule } from './database/database.module';
import databaseConfig from 'src/config/database.config';
import appConfig from 'src/config/app.config';
import jwtConfig from 'src/config/jwt.config';

const ENV = process.env.NODE_ENV;

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [ !ENV ? '.env' : `.env.${ENV}` ],
      cache: true,
      expandVariables: true,
      load: [databaseConfig, appConfig, jwtConfig]
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
