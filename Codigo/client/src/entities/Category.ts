export class Category {
 
    public name: string;
    public fiscalCode: string;
    public id?: string;

    constructor(name: string, fiscalCode: string, id?: string) {
        this.name = name
        this.fiscalCode = fiscalCode
        this.id = id;
    }    
}