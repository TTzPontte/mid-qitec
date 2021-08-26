import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleDriveService } from './google-drive.service';

@Module({
  providers: [GoogleDriveService, ConfigService]
})
export class GoogleDriveModule { }
