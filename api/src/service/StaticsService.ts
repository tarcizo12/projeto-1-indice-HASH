import { Statistics } from '../model/Statistics';
import { Bucket } from '../model/Bucket';

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
    let totalCollisions = 0;
    
    bucketsOfLoad.forEach((bucket: Bucket) => {
    
      let currentBucket = bucket.getNextBucket();

      while (currentBucket !== null) {  
        totalNextBucketsOnOverflow++;

        totalCollisions += currentBucket.getSize();
        currentBucket = currentBucket.getNextBucket();
      }

      
    });

    this.staticsOfLoad.setNumberOfOverflows(totalNextBucketsOnOverflow);
    this.staticsOfLoad.setNumberOfCollisions(totalCollisions);
    
    console.log("Colisoes -> ", totalCollisions)
    console.log("Overflow -> ", totalNextBucketsOnOverflow)
    console.log("FIM DE CALCULO \n \n \n \n")
  }

  calculateCollisionRate(tableSize: number): number {
    if (tableSize === 0) {
      return 0; // Evita divisão por zero
    }

    const currentTotalCollisions =
      this.getStaticsOfLoad().getNumberOfCollisions();

    return currentTotalCollisions / tableSize;
  }

  // Função para calcular a taxa de overflows
  calculateOverflowRate(numberOfBuckets: number): number {
    if (numberOfBuckets === 0) {
      return 0; // Evita divisão por zero
    }

    const currentTotalOverFlows =
      this.getStaticsOfLoad().getNumberOfOverflows();

    return currentTotalOverFlows / numberOfBuckets;
  }
}
