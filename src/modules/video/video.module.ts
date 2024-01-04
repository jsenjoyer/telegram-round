import { Module, OnModuleInit } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoUpdate } from './video.update';
import { VideoWizard } from './video.wizard';
import { SharedModule } from '../shared/shared.module';
import {
  Ffmpeg,
  FluentFfmpegModule,
  InjectFluentFfmpeg,
} from '@mrkwskiti/fluent-ffmpeg-nestjs';
import * as ffmpegPath from 'ffmpeg-static';

@Module({
  imports: [SharedModule, FluentFfmpegModule.forRoot()],
  providers: [VideoService, VideoUpdate, VideoWizard],
  exports: [VideoWizard],
})
export class VideoModule implements OnModuleInit {
  constructor(@InjectFluentFfmpeg() private readonly ffmpeg: Ffmpeg) {}

  onModuleInit() {
    this.ffmpeg.setFfmpegPath(ffmpegPath as unknown as string);
  }
}
