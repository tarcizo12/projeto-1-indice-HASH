import { BaseClass } from '../utils/BaseClass';

export class Bucket extends BaseClass {
  private mapping: Record<string, number>; // Mapeamento de chaves para endereços de páginas

  constructor() {
    super();
    this.mapping = {};
  }

  getMapping(): Record<string, number> {
    return this.mapping;
  }

  addMapping(key: string, pageNumber: number): void {
    this.mapping[key] = pageNumber;
  }

  removeMapping(key: string): void {
    delete this.mapping[key];
  }

  getPageNumberByKey(key: string): number | undefined {
    return this.mapping[key];
  }
}
