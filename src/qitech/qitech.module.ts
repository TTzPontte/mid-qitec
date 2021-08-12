import { Module } from '@nestjs/common';
import { QitechService } from './qitech.service';
import { QitechController } from './qitech.controller';

@Module({
  controllers: [QitechController],
  providers: [QitechService]
})
export class QitechModule {}
