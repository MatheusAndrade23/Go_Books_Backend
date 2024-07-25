import { AttachmentsRepository } from "@/domain/auctions/application/repositories/attachments-repository";
import { Attachment } from "@/domain/auctions/enterprise/entities/attachment";

export class InMemoryAttachmentsRepository implements AttachmentsRepository {
  public items: Attachment[] = [];

  async create(attachment: Attachment) {
    this.items.push(attachment);
  }
}
