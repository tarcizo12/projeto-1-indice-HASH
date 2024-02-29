export class BaseClass {
    getClassName(): string {
        return this.constructor.name;
    };
};