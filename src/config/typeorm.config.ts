import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

config();

class TypeormConfig {
  constructor(private env: { [k: string]: string | undefined }) {
    console.log(__dirname + '../../**/**/*.entity.ts');
  }

  private getValue(key: string, throwOnMissing?: true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config erro. Missing env.${key}`);
    }
    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((key) => {
      this.env[key] = this.getValue(key);
    });
    return this;
  }

  private isProduction() {
    const production = this.getValue('MODE');
    return production === 'production';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      ssl: this.isProduction(),
      synchronize: false
    };
  }
}

const typeormConfig = new TypeormConfig(process.env).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE'
]);

export default typeormConfig;
