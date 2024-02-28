import { BaseClass } from '../utils/BaseClass';

export class Bucket extends BaseClass {
  private mapping: Record<string, number>;
  private maxSizeOfBucket: number;
  private bucketIsFull: boolean = false;

  constructor(sizeBucket: number) {
    super();
    this.mapping = {};
    this.maxSizeOfBucket = sizeBucket;
  };

  getMapping(): Record<string, number> {
    return this.mapping;
  };

  addMapping(key: string, pageNumber: number): void {
    if (this.getSize() <= this.maxSizeOfBucket) {
      this.mapping[key] = pageNumber;
    } else {
      this.bucketIsFull = true; 
    }
  }

  removeMapping(key: string): void {
    this.bucketIsFull  = false;
    delete this.mapping[key];
  }

  getPageNumberByKey(key: string): number | undefined { return this.mapping[key]};

  getMaxSize(): number { return this.maxSizeOfBucket};

  getSize(): number { return Object.keys(this.mapping).length};
}
