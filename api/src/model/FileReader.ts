import * as fs from 'fs';
//Classe para leitura

export class FileReader {
    private lines: string[] = [];

    constructor(private filePath: string) {}

    readFromFile(): void {
        try {
            const content = fs.readFileSync(this.filePath, 'utf-8');

            this.lines = content.split('\n');

            this.lines = this.lines.map(line => line.trim());
        } catch (error) {
            console.error('Error reading the file:', error);
        }
    }

    getLines(): string[] {
        return this.lines;
    }
}
