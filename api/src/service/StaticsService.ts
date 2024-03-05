import { Statistics } from "../model/Statistics";
import { Bucket } from "../model/Bucket";

export class StatisticsService {
    private staticsOfLoad: Statistics;

    constructor() {
        this.staticsOfLoad = new Statistics();
    }

    getStaticsOfLoad(): Statistics {
        return this.staticsOfLoad;
    };


    setStaticsOfLoad(statistics: Statistics): void {
        this.staticsOfLoad = statistics;
    };

    calculateStatics(bucketsOfLoad: Bucket[]): void {
        let totalNextBucketsOnOverflow = 0;
        let totalColisions = 0;

        bucketsOfLoad.forEach((bucket: Bucket) => {
            let currentBucket = bucket.getNextBucket();

            while (currentBucket !== null) {
                totalNextBucketsOnOverflow++;
                totalColisions += currentBucket.getSize();
                currentBucket = currentBucket.getNextBucket();
            };
        });

        this.staticsOfLoad.setNumberOfOverflows(totalNextBucketsOnOverflow);
        this.staticsOfLoad.setNumberOfColisions(totalColisions)
    }
}
