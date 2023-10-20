export class Supplier {
    private name: string;
    private description: string;
    private id?: string;

    public constructor(name: string, description: string, id?: string){
        this.name = name;
        this.description = description;
        this.id = id;
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

    public getid(): string | undefined {
        return this.id;
    }

    public setid(id: string): void {
        this.id = id;
    }
}