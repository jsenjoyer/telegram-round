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
    const { message_id } = await ctx.reply('Send me a video');
    // @ts-ignore
    ctx.wizard.state.message = message_id;
    ctx.wizard.next();
  }

  @WizardStep(2)
  @On('video')
  async step2(ctx: WizardContext) {
    this.bot.telegram.editMessageText(
      ctx.chat.id,
      // @ts-ignore
      ctx.wizard.state?.message,
      undefined,
      'Processing...',
    );
    const message = ctx.message as VideoMessage;
    this.bot.telegram.getFileLink(message.video.file_id).then(async (link) => {
      const fileName = link.href.split('/').pop();
      const dowlonadPath = path.join(os.homedir(), 'Desktop', fileName);
      const newFile = path.join(os.homedir(), 'Desktop', 'new_' + fileName);
      const writer = fs.createWriteStream(dowlonadPath, { flags: 'w' });
      const response = await this.http.axiosRef({
        url: link.href,
        method: 'GET',
        responseType: 'stream',
      });
      response.data.pipe(writer);
      writer.on('finish', () => {
        this.fi({ source: dowlonadPath })
          .videoCodec('copy')
          .audioCodec('copy')
          .duration(1)
          .save(newFile)
          .on('end', () => {
            const file = fs.readFileSync(newFile);
            ctx.sendVideo({ source: file });
          });
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
