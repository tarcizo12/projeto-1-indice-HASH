import { Page } from "../model/Page";
import { TableService } from "./TableService";
import { Table } from "../model/Table";
import { Tuple } from "../model/Tuple";

export class PageService{
    
    getPagination(sizePage: number, table: Table): Page[]{
        return this.splitArrayIntoParts(table.getListOfTuples(), sizePage);
    };


    private splitArrayIntoParts(array: Tuple[], maxSize: number): Page[] {
        if (maxSize <= 0) {
            throw new Error('Max size must be greater than zero.');
        }

        const pagination: Page[] = [];

        for (let i = 0; i < array.length; i += maxSize) {
            const part = array.slice(i, i + maxSize);

            pagination.push(
                new Page(
                    pagination.length + 1,
                    part
                )
            );
        };
    
        return pagination;
    }

};