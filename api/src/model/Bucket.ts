import { BaseClass } from '../utils/BaseClass';
export class Bucket extends BaseClass {
  private mapping: Record<string, number>;
  private maxSizeOfBucket: number;
  private bucketIsFull: boolean = false;
  private nextBucket: Bucket | null;
  // private numberOfOverflows: number;
  // private numberOfColisions: number;

  constructor(sizeBucket: number) {
    super();
    this.mapping = {};
    this.maxSizeOfBucket = sizeBucket;
    this.nextBucket = null;
    // this.numberOfColisions = 0;
    // this.numberOfOverflows = 0;
  }

  getMapping(): Record<string, number> {
    return this.mapping;
  }

  addMapping(key: string, pageNumber: number): void {
    if (!this.bucketIsFull) {
      this.mapping[key] = pageNumber;
      this.setBucketState(Object.keys(this.mapping).length === this.maxSizeOfBucket);

    } else {
      
      if (this.nextBucket === null) {
        this.nextBucket = new Bucket(this.maxSizeOfBucket);
      }

      this.nextBucket.addMapping(key, pageNumber);
    }
  }

  getPageNumberByKey(key: string): number | undefined {
    if (key in this.mapping) { return this.mapping[key] }; 
    
    if(this.nextBucket !== null) { return this.nextBucket.getPageNumberByKey(key) }; 
    
    return undefined;
  }

  getSize(): number {
    let size = Object.keys(this.mapping).length;

    if (this.nextBucket !== null) {
      size += this.nextBucket.getSize();
    }
    return size;
  }

  setBucketState(state: boolean): void {
    this.bucketIsFull = state;
  };

  getBucketState(): boolean {
    return this.bucketIsFull;
  };

  getNextBucket(): Bucket{return this.nextBucket}
}
