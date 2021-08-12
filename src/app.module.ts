import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EscrowModule } from './escrow/escrow.module';
import { QitechModule } from './qitech/qitech.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ autoLoadEntities: true }),
    EscrowModule,
    QitechModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

