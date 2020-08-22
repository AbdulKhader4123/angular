import { Component, OnInit, NgZone } from '@angular/core';
import { EditService, ToolbarService, PageService } from '@syncfusion/ej2-angular-grids';
import { orderData } from './data';
import { RecipeService } from '../shared/recipe.service';
import { HttpClient } from '@angular/common/http';
import { Ajax } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.scss'],
  providers: [ToolbarService, EditService, PageService]
})
export class EditproductComponent implements OnInit {

  constructor(private recipeService:RecipeService,private ngZone: NgZone,private http:HttpClient,) { 
    
  }
  ngOnInit() {
      // this.http.get(`${this.baseUrl}`+"/api/products/
      this.http.get("/api/products/getProducts").subscribe((res) => {
             for (var i in res) {
                   this.AllProductString.push(res[i])
             }
             this.ngZone.run( () => {
              this.data=this.AllProductString
               });
}
);


    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Batch' };
    this.toolbar = ['Add', 'Delete', 'Update', 'Cancel'];
    // this.productidrules = { required: true, number: true, minLength: [this.customFn, 'ProductId Exists...']  };
    this.descriptionrules = { required: true };
    this.productIdrules = { required: true };
    this.pricerules =  { required: true };
    this.imagerules =  { required: true };
    this.editparams = { params: { popupHeight: '300px' }};
    this.pageSettings = {pageCount: 5};

    
  }
 
AllProductString:Object[]=[];

  public data:Object[];
  public editSettings: Object;
  public toolbar: string[];
  public productidrules: Object;
  public descriptionrules: Object;
  public pricerules: Object;    
  public productIdrules: Object;
  public imagerules: Object;    
  public editparams: Object;
  public pageSettings: Object;
  public value = 'value';
  public flag=true;
  count="";

//   public customFn: (args) => boolean = (args) => {
// console.log(args.value)
// if(this.count!=args.value){
//   console.log("4353")
//     let ajax = new Ajax("/api/products/checkProduct", "POST", true); 
//     ajax.send(JSON.stringify({ Id : "111" })).then(  //  
//       (value) => {
//         console.log(value) 
//           // if (<any>value === "true") {  // check the status 
//           //     this.final = true; 
//           // } else { 
//           //     this.final = false; 
//            this.flag = false; 
//           // } 
//       }); 
//    return true; 
//   }; 
// }
    // this.http.get("/api/products/checkProduct").subscribe((res)=>{
    //   // console.log(res);
    //    if(res['msg']=="ProductId exists"){
    //     return false; 

    //    }
    //    else{
    //     return true; 
    //    }
    // });
   
    batchSave(e: any) { 
      console.log(e.batchChanges.deletedRecords )
      e.batchChanges.addedRecords.forEach(element => {
        for (let i in element.image) {
          if(element.image[i]==null){
            delete element.image[i];
          }
        } 
      });
      var data = { 
          action: 'batch', Changed: e.batchChanges.changedRecords, Added: e.batchChanges.addedRecords, Deleted: e.batchChanges.deletedRecords 
      } 
      console.log(data)
      var ajax = new Ajax(); 
      ajax.data = JSON.stringify(data); 
      ajax.url = "/api/products/UpdateProduct"; 
      ajax.type = "POST"; 
      (ajax as any).contentType = "application/json; charset=utf-8"; 
      (ajax as any).successHandler = function (data:any) { 
          // you can refresh the grid here with new data 
         // this.grid =data; 
         console.log(data)
      } 
      ajax.send(); 
  }    

}
