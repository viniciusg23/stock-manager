export class Employee {
    
    public name: string;
    public job: string;
    public id?: string;

    public constructor(name: string, job: string, id?: string) {
        this.name = name
        this.job = job
        this.id = id
    }  

}