import { UseCaseError } from "@/core/errors/use-case-error";

export class SellerAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Seller "${identifier}" already exists.`);
  }
}
