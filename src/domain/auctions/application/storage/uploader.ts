import { Inject, Injectable } from "@nestjs/common";

export interface UploadParams {
  fileName: string;
  fileType: string;
  body: Buffer;
}

@Injectable()
export abstract class Uploader {
  abstract upload(params: UploadParams): Promise<{ url: string }>;
}
