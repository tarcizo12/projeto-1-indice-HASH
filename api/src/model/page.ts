import { Tuple } from './Tuple';
import { BaseClass } from '../utils/BaseClass';

export class Page extends BaseClass {
  constructor(private pageNumber: number, private tuples: Tuple[]) {
    super();
  }

  getPageNumber(): number {
    return this.pageNumber;
  }

  setPageNumber(pageNumber: number): void {
    this.pageNumber = pageNumber;
  }

  getTuples(): Tuple[] {
    return this.tuples;
  }

  addTuple(tuple: Tuple): void {
    this.tuples.push(tuple);
  }
}
