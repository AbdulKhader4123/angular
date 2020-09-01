import { Product } from '../recipes/products.model';

export class Order{
    public OrderId ?:number;
    public OrderStatus?:string;
    public name? :string;
    public phone?:string;
    public pincode?:string;
    public address? :string;
    public state?:string;
    public city?:string;
    public email?:string;
    public ProductDetails?:Product[];
    public amount ?:number;
    public items ?:number;
    public savings ?:number;
    public date ?:string;
    public deliveryDate ?:string;
    public deliveryStatus?:string;

    constructor(Response:any){
        this.OrderId=Response.OrderId;
        this.name=Response.title;
        this.OrderStatus=Response.OrderStatus;
        this.address=Response.address;
        this.pincode=Response.pincode;
        this.state=Response.state;
        this.city=Response.city
        this.email=Response.email;
        this.ProductDetails=Response.ProductDetails;
        this.phone=Response.phone;
        this.amount=Response.amount;
        this.savings=Response.savings;
        this.items=Response.items;
        this.date=Response.date;
        this.deliveryDate=Response.deliveryDate;
        this.deliveryStatus=Response.deliveryStatus;
    }
}