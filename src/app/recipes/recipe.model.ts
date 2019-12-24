import { Ingredients } from '../shared/Ingredients.model';

export class Recipe{
    public name :string;
    public description:string;
    public imagePath:string;
    public ingredients:Ingredients[];

    constructor(name :string,description:string,imagePath:string,ingredients:Ingredients[]){

        this.description=description;
        this.name=name;
        this.imagePath=imagePath;
        this.ingredients=ingredients;
    }

}