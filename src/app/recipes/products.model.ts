export class Product{
    public name ?:string;
    public description?:string;
    public imagePath?:string[];
    public productId ?:number;
    public price?:number;
    public discount?:number;
    public productDetails?:object;
    public quantity?:number;
    public category?:string;
    public id?:string;

    constructor(Response:any){
        this.description=Response.description;
        this.name=Response.title;
        this.imagePath=Response.image;
        this.productId=Response.productId;
        this.price=Response.price;
        this.discount=Response.discount;
        this.productDetails=Response.ProductDetails
        this.quantity=Response.quantity?Response.quantity:0;
        this.category=Response.category
        this.id=Response._id
    }

}