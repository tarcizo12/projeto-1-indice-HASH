

export class Statistics{
    private numberOfOverflows: number;
    private numberOfColisions: number;


    getNumberOfOverflows(): number {return this.numberOfOverflows}

    getNumberOfColisions(): number {return this.numberOfColisions}

    setNumberOfOverflows(value: number): void{this.numberOfOverflows = value}

    setNumberOfColisions(value: number): void {this.numberOfColisions = value}
};