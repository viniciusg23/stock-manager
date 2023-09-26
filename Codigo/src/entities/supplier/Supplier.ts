export class Supplier {
    private name: string;
    private description: string;


    public constructor(name: string, description: string){
        this.name = name;
        this.description = description;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

}