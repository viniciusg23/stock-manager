export class Category {
 
    private name: string;
    private fiscalCode: string;
    private id?: string;

    constructor(name: string, fiscalCode: string, id?: string) {
        this.name = name
        this.fiscalCode = fiscalCode
        this.id = id;
    }    

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getFiscalCode(): string {
        return this.fiscalCode;
    }

    public setFiscalCode(fiscalCode: string): void {
        this.fiscalCode = fiscalCode;
    }

    public getId(): string | undefined{
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }
}