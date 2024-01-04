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
          .duration(1)
          .videoFilter(
            "crop='if(gte(iw/ih,1),ih,iw)': 'if(gte(ih/iw,1),iw,ih)'",
          )
          .save(newFile)
          .on('end', async () => {
            const file = fs.readFileSync(newFile);
            await ctx.replyWithVideo({ source: file });
            ctx.scene.leave();
            ctx.scene.enter(VIDEO_WIZARD);
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
