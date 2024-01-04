import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

@Injectable()
export class FilesService {
  constructor(private readonly http: HttpService) {}

  getFileBuffer(url: string) {
    return this.http
      .get(url, { responseType: 'arraybuffer' })
      .pipe(map((res) => res.data));
  }
}
