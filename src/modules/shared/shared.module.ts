import { Module } from '@nestjs/common';
import { FilesService } from '../../services/files.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [FilesService],
  exports: [HttpModule, FilesService],
})
export class SharedModule {}
