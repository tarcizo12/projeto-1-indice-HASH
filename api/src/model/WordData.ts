export class WordData {
    constructor(private id: number, private valueOfData: string) {}

    
    getId(): number {
        return this.id;
    }

    
    setId(id: number): void {
        this.id = id;
    }

    
    getValueOfData(): string {
        return this.valueOfData;
    }

    
    setValueOfData(valueOfData: string): void {
        this.valueOfData = valueOfData;
    }
}
