import { UseCaseError } from "@/core/errors/use-case-error";

export class BuyerAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Buyer "${identifier}" already exists.`);
  }
}
