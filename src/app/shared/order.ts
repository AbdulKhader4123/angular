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
    public deliverDate ?:string;
    public deliveryStatus?:string;
    public shippingDate ?:string;
    public shippingStatus?:string;
    public returnRaised ?:string;
    public returnReason?:string;
    public returnDate?:string;

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
        this.deliverDate=Response.deliverDate;
        this.deliveryStatus=Response.deliveryStatus;
        this.shippingDate =Response.shippingDate;
        this.shippingStatus=Response.shippingStatus;
        this.returnRaised =Response.returnRaised;
        this.returnReason=Response.returnReason;
        this.returnDate=Response.returnDate;
    }
}