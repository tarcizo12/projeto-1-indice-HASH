import { Page } from '../model/Page';
import { Table } from '../model/Table';
import { Tuple } from '../model/Tuple';
import { Bucket } from '../model/Bucket';
import { Hash } from '../model/Hash';

export class MainService {
  private buckets: Bucket[];
  private hashFunction: Hash;

  constructor() {
    this.hashFunction = new Hash();
  }

  private handleCreatePages(array: Tuple[], maxSize: number, numberMaxOfBuckets: number): Page[] {
    //Divide a tabela em paginas de acordo com o tamanho maximo definido por o usuario

    if (maxSize <= 0) {
      throw new Error('Max size must be greater than zero.');
    }

    const pagination: Page[] = [];
    const roundsNumber = Math.ceil(array.length / numberMaxOfBuckets);
    let numberOfPage = 0;
    const pageData: Tuple[] = [];
      
      for (let i = 0; i < array.length; i++) {
          const part = array[i];
          pageData.push(part);
          this.handleCreationBucket(part, 2, roundsNumber);
          if (pageData.length === maxSize) {
              const currentPage = new Page(numberOfPage, pageData);
              pagination.push(currentPage);
              numberOfPage++;

          }
      }

    return pagination;
  }

  private handleCreationBucket(
    data: string,
    bucketSize: number,
    numberMaxOfBuckets: number,
  ): void {
    const bucketArray: Bucket[] = Array.from({ length: numberMaxOfBuckets }, () => new Bucket(bucketSize),
    );

    // pages.forEach((page: Page) => {
    //   page.getTuples().forEach((tuple: Tuple) => {
    //     const hashKeyValue = this.hashFunction.hashT(tuple.getValueOfData(), pages.length);
    //     console.log(
    //       `Pagina -> ${page.getPageNumber()} `,
    //       `Linha atual -> ${tuple.getLine()} `,
    //       `Chave hash -> ${hashKeyValue}`,
    //     );
    //   });
    // });
  }

    
  handleCreationPagesWithBuckets(bucketSize: number, pageSize: number, table: Table): void {
    //1º - Cria as paginas
    const pages: Page[] = this.handleCreatePages(table.getListOfTuples(), pageSize);
    const numberMaxOfBuckets: number = table.getListOfTuples().length / bucketSize;

    //2º - Gerencia a criação dos buckets de acordo com as paginas
    //this.handleCreationBucket(pages, bucketSize, numberMaxOfBuckets);
  }

  getBucketsCreatedWithPagination(): Bucket[] {
    return this.buckets;
  }
}
