import { InjectBot, On, Wizard, WizardStep } from 'nestjs-telegraf';
import { WizardContext } from 'telegraf/typings/scenes';
import { Context, Telegraf } from 'telegraf';
import { Message } from '@telegraf/types';
import VideoMessage = Message.VideoMessage;
import { FilesService } from '../../services/files.service';
import { Ffmpeg, InjectFluentFfmpeg } from '@mrkwskiti/fluent-ffmpeg-nestjs';
import { HttpService } from '@nestjs/axios';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { StreamableFile } from '@nestjs/common';
import { fsReadFile } from 'ts-loader/dist/utils';

export const VIDEO_WIZARD = 'video-wizard';

@Wizard(VIDEO_WIZARD)
export class VideoWizard {
  constructor(
    private http: HttpService,
    @InjectBot() private readonly bot: Telegraf<Context>,
    @InjectFluentFfmpeg() private readonly fi: Ffmpeg,
    private readonly fileService: FilesService,
  ) {}

  @WizardStep(1)
  async step1(ctx: WizardContext) {
    await ctx.reply('Send me a video');
    ctx.wizard.next();
  }

  @WizardStep(2)
  @On('video')
  async step2(ctx: WizardContext) {
    console.log('video');
    const message = ctx.message as VideoMessage;
    ctx.replyWithVideo(message.video.file_id);
    this.bot.telegram.getFileLink(message.video.file_id).then(async (link) => {
      const writer = fs.createWriteStream(
        path.join(os.homedir(), 'Desktop', '2.mp4'),
      );
      const response = await this.http.axiosRef({
        url: link.href,
        method: 'GET',
        responseType: 'stream',
      });
      response.data.pipe(writer);
      writer.on('finish', () => {
        const data = fs.readFileSync(
          path.join(os.homedir(), 'Desktop', '2.mp4'),
        );
        ctx.sendVideo({ source: data });
      });
    });
  }

  @WizardStep(2)
  @On('text')
  async step3(ctx: WizardContext) {
    console.log('step3');
    ctx.reply('step3');
  }
}
