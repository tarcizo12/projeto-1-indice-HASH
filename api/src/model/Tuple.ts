//Tupla: representa uma linha da tabela, contém o valor da chave de busca e os dados da linha.
import { BaseClass } from "../utils/BaseClass";

export class Tuple extends BaseClass{
    constructor(private line: number, private valueOfData: string) {
        super();
    }

    
    getLine(): number {
        return this.line;
    }

    
    setLine(value: number): void {
        this.line = value;
    }

    
    getValueOfData(): string {
        return this.valueOfData;
    }

    
    setValueOfData(valueOfData: string): void {
        this.valueOfData = valueOfData;
    }
};
