import { WordData } from "../model/WordData";
import { FileReader } from "../data/FileReader";

export class WordDataService{
    private PATH_TXT: string = 'src/data/words_alpha.txt'

    getValuesTxt():  WordData[] {
        const fileReader = new FileReader(this.getPath());
        const words: WordData[] = []

        fileReader.readFromFile();
        const fileLines = fileReader.getLines();    

        fileLines.forEach((currentValue, index) => {
            words.push(
                new WordData(index , currentValue)
            )
        });
        
        
        return words
    };


    getPath(): string{ return this.PATH_TXT}
}