import { BaseClass } from "../utils/BaseClass";

export class Hash extends BaseClass {

  public hashT(text: string, totalBuckets: number): number {
    let hashC: number = 5381;
    const primeNumber: number = 31; // Pode escolher outro número primo

    for (let i = 0; i < text.length; i++) {
      hashC = (hashC * primeNumber) ^ text.charCodeAt(i);
    }

    // Normalizar o valor do hash com base na quantidade total de buckets
    return (hashC % totalBuckets + totalBuckets) % totalBuckets;
  }
}
