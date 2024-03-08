

export class Statistics{
    private numberOfOverflows: number;
    private numberOfCollisions: number;


    getNumberOfOverflows(): number {return this.numberOfOverflows}

    getNumberOfCollisions(): number {return this.numberOfCollisions}

    setNumberOfOverflows(value: number): void{this.numberOfOverflows = value}

    setNumberOfCollisions(value: number): void {this.numberOfCollisions = value}
}