import { DomainEvents } from "@/core/events/domain-events";
import { SellersRepository } from "@/domain/auctions/application/repositories/sellers-repository";
import { Seller } from "@/domain/auctions/enterprise/entities/seller";

export class InMemorySellersRepository implements SellersRepository {
  public items: Seller[] = [];

  async findByEmail(email: string) {
    const seller = this.items.find((item) => item.email === email);

    if (!seller) {
      return null;
    }

    return seller;
  }

  async create(seller: Seller) {
    this.items.push(seller);

    DomainEvents.dispatchEventsForAggregate(seller.id);
  }
}
