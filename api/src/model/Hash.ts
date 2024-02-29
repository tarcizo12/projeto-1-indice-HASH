import {BaseClass} from "../utils/BaseClass";

export class Hash extends BaseClass {

  public hashT(text: string, totalBuckets: number): number {
      let hashC: number = 0;

    for (let i = 0; i < text.length; i++)
      hashC += text.charCodeAt(i);

    // Normalizar o valor do hash com base na quantidade total de buckets
    return (hashC % totalBuckets);
  }
}