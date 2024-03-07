import { Statistics } from "../model/Statistics";
import { Bucket } from "../model/Bucket";

export class StatisticsService {
    private staticsOfLoad: Statistics;

    constructor() {
        this.staticsOfLoad = new Statistics();
    }

    getStaticsOfLoad(): Statistics {
        return this.staticsOfLoad;
    }


    setStaticsOfLoad(statistics: Statistics): void {
        this.staticsOfLoad = statistics;
    }

    calculateStatics(bucketsOfLoad: Bucket[]): void {
        let totalNextBucketsOnOverflow = 0;
        let totalColisions = 0;

        bucketsOfLoad.forEach((bucket: Bucket) => {
            //console.log(bucket)
            
            let currentBucket = bucket.getNextBucket();

            while (currentBucket !== null) {
                totalNextBucketsOnOverflow++;
                totalColisions += currentBucket.getSize();
                currentBucket = currentBucket.getNextBucket();
            }
        });

        this.staticsOfLoad.setNumberOfOverflows(totalNextBucketsOnOverflow);
        this.staticsOfLoad.setNumberOfColisions(totalColisions)
    }


    calculateCollisionRate(tableSize: number): number {

        if (tableSize === 0) {
            return 0; // Evita divisão por zero
        }

        const currentTotalCollisions = this.getStaticsOfLoad().getNumberOfColisions();

        return currentTotalCollisions / tableSize;
    }


    // Função para calcular a taxa de overflows
    calculateOverflowRate(bucketsSize: number): number {
        if (bucketsSize === 0) {
            return 0; // Evita divisão por zero
        }
        
        const currentTotalOverFlows = this.getStaticsOfLoad().getNumberOfOverflows();

        return currentTotalOverFlows / bucketsSize;
    }

}
