import {Page} from "../model/Page";
import {Table} from "../model/Table";
import {Tuple} from "../model/Tuple";
import {Bucket} from "../model/Bucket";
import {Hash} from "../model/Hash";

export class MainService {
    private buckets: Bucket[] = [];
    private pages: Page[] = [];
    private hashFunction: Hash;
    private numberMaxOfBuckets: number;

    constructor() {
        this.hashFunction = new Hash()
    }

    private handleCreatePages(array: Tuple[], maxSize: number): Page[] {
        if (maxSize <= 0) {
            throw new Error('Max size must be greater than zero.');
        }

        for (let i = 0; i < array.length; i += maxSize) {
            const part = array.slice(i, i + maxSize);
            const numberOfPage = this.pages.length;
            const currentPage = new Page(numberOfPage, part);

            this.pages.push(currentPage);
        }
        return this.pages;
    }

    private handleCreationBucket(bucketSize: number): void {
        const bucketArray: Bucket[] = Array.from({length: this.numberMaxOfBuckets}, () => new Bucket(bucketSize));
        this.pages.forEach((page: Page) => {
            page.getTuples().forEach((tuple: Tuple) => {
                const hashKeyValue = this.hashFunction.hashT(tuple.getValueOfData(), this.numberMaxOfBuckets);
                bucketArray[hashKeyValue].addMapping(tuple.getValueOfData(), page.getPageNumber())
            })
        });
        this.buckets = bucketArray;
    }

    handleCreationPagesWithBuckets(bucketSize: number, pageSize: number, table: Table): void {
        //1º - Cria as paginas
        this.pages = this.handleCreatePages(table.getListOfTuples(), pageSize);
        this.numberMaxOfBuckets = Math.ceil(table.getListOfTuples().length / bucketSize);

        //2º - Gerencia a criação dos buckets de acordo com as paginas
        this.handleCreationBucket(bucketSize);
    }

    getPageByValue(value: string): number {
        const hasValue = this.hashFunction.hashT(value, this.numberMaxOfBuckets);

        return this.buckets[hasValue].getPageNumberByKey(value)
    }

    getAllBucketsCreateds(): Bucket[]{return this.buckets}

    getPageById(pageId: number): Page{ return this.pages[pageId] }
    
    reset(): void {
        this.buckets = [];
        this.pages = [];
        this.numberMaxOfBuckets = 0;
    }
    getPagesVisitedByTableScan(value: string): number{ 
        
        let visitedPage: number = 0;

        for (const page of this.pages) {
            visitedPage++

            const indexFound: Tuple = page.getTuples().find(t => t.getValueOfData() === value)
            
            if(indexFound != undefined){
                return visitedPage
            }
        }

        return null
    }
}