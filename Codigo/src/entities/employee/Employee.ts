export class Employee {
    
    private name: string;
    private job: string;
    private id?: string;

    constructor(name: string, job: string, id?: string) {
        this.name = name
        this.job = job
        this.id = id
    }  

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getJob(): string {
        return this.job;
    }

    public setJob(job: string): void {
        this.job = job;
    }

    public getId(): string | undefined {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

}