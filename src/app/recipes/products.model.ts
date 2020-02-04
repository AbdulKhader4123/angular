import { Ingredients } from '../shared/Ingredients.model';

export class Product{
    public name :string;
    public description:string;
    public imagePath:string;
    public productId :number;
    public price:number;
    public discount:number
    // public ingredients:Ingredients[];

    // constructor(name :string,description:string,imagePath:string,ingredients:Ingredients[]){
    constructor(Response:any){


        this.description=Response.description;
        this.name=Response.title;
        this.imagePath=Response.image;
        this.productId=Response.productId;
        this.price=Response.price;
        this.discount=Response.discount;
        // this.ingredients=ingredients;
    }

}