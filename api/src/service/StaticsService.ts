import { Statistics } from "../model/Statistics";
import { Bucket } from "../model/Bucket";

export class StatisticsService {
    private staticsOfLoad: Statistics;

    constructor() {
        this.staticsOfLoad = new Statistics();
    }

    // Getter for staticsOfLoad
    getStaticsOfLoad(): Statistics {
        return this.staticsOfLoad;
    };

    // Setter for staticsOfLoad
    setStaticsOfLoad(statistics: Statistics): void {
        this.staticsOfLoad = statistics;
    };

    calculateStatics(bucketsOfLoad: Bucket[]): void{
        bucketsOfLoad.forEach((bucket: Bucket)=>{
            console.log(bucket.getNextBucket())
        })
    }
}
