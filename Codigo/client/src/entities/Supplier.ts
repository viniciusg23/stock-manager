export class Supplier {
    [key: string]: any;
    public name: string;
    public description: string;
    public id?: string;

    public constructor(name: string, description: string, id?: string){
        this.name = name;
        this.description = description;
        this.id = id;
    }
}