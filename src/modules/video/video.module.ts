import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoUpdate } from './video.update';
import { VideoWizard } from './video.wizard';
import { SharedModule } from '../shared/shared.module';
import { FluentFfmpegModule } from '@mrkwskiti/fluent-ffmpeg-nestjs';

@Module({
  imports: [SharedModule, FluentFfmpegModule.forRoot()],
  providers: [VideoService, VideoUpdate, VideoWizard],
  exports: [VideoWizard],
})
export class VideoModule {}
