import { BaseClass } from "../utils/BaseClass";

export class Hash extends BaseClass {
  private hashC: number = 0;

  public hashT(text: string, totalBuckets: number): number {
    for (let i = 0; i < text.length; i++) {
      this.hashC = text.charCodeAt(i) + this.hashC;
    }

    // Normalizar o valor do hash com base na quantidade total de buckets
    const normalizedHash = this.hashC % totalBuckets;

    return normalizedHash;
  }
}