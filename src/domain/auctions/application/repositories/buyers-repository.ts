import { Buyer } from "../../enterprise/entities/buyer";

export abstract class BuyersRepository {
  abstract findByEmail(email: string): Promise<Buyer | null>;
  abstract create(buyer: Buyer): Promise<void>;
}
