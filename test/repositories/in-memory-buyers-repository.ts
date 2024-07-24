import { DomainEvents } from "@/core/events/domain-events";
import { BuyersRepository } from "@/domain/auctions/application/repositories/buyers-repository";
import { Buyer } from "@/domain/auctions/enterprise/entities/buyer";

export class InMemoryBuyersRepository implements BuyersRepository {
  public items: Buyer[] = [];

  async findByEmail(email: string) {
    const buyer = this.items.find((item) => item.email === email);

    if (!buyer) {
      return null;
    }

    return buyer;
  }

  async create(buyer: Buyer) {
    this.items.push(buyer);

    DomainEvents.dispatchEventsForAggregate(buyer.id);
  }
}
