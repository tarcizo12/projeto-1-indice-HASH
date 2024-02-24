import { Tuple } from "../model/Tuple";
import { FileReader } from "../model/FileReader";

export class TupleService{
    private PATH_TXT: string = 'src/data/words_alpha.txt'

    getValuesTxt():  Tuple[] {
        const fileReader = new FileReader(this.getPath());
        const words: Tuple[] = []

        fileReader.readFromFile();
        const fileLines = fileReader.getLines();    

        fileLines.forEach((currentValue, index) => {
            words.push(
                new Tuple(index , currentValue)
            )
        });
        
        
        return words
    };

    getPath(): string{ return this.PATH_TXT}
};