import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from '../config';

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';

// client.query('SELECT * FROM tasks', (err, res) => {
//   console.error(err);
//   console.log(res.rows);
// });

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        //descomentar aqui para conexion local
        //const { user, host, dbName, password, port } = configService.postgres;
        return {
          type: 'postgres',
          url: configService.postgresUrl,
          //descomentar aqui para conexion local
          /* host,
          port,
          username: user,
          password,
          database: dbName, */
          synchronize: false,
          autoLoadEntities: true,
          //habilitamos la confign ssl para heroku
          ssl: {
            rejectUnauthorized: false,
          },
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        //descomentar para conexion local postgresql
        //const { user, host, dbName, password, port } = configService.postgres;
        const client = new Client({
          connectionString: configService.postgresUrl,
          //habilitamos la confign ssl para heroku
          ssl: {
            rejectUnauthorized: false,
          },
          //descomentar para conexion local postgresql
          /* user,
          host,
          database: dbName,
          password,
          port, */
        });
        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'PG', TypeOrmModule],
})
export class DatabaseModule {}
