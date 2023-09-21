export class Supplier {
    private name: string;
    private description: string;

    public constructor(name: string, description: string){
        this.name = name;
        this.description = description;
    }

    public get getName(){
        return this.name;
    }

    public set setName(name: string){
        this.name = name;
    }

    public get getDescription(){
        return this.description;
    }

    public set setDescription(description: string){
        this.description = description;
    }
}