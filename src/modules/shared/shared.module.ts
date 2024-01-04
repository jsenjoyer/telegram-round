import { Module } from '@nestjs/common';
import { FilesService } from '../../services/files.service';
import { HttpModule } from '@nestjs/axios';
import { FluentFfmpegModule } from '@mrkwskiti/fluent-ffmpeg-nestjs';

@Module({
  imports: [HttpModule, FluentFfmpegModule.forRoot()],
  providers: [FilesService],
  exports: [HttpModule, FilesService],
})
export class SharedModule {}
