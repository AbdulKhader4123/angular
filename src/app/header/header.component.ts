import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { Router } from '@angular/router';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import * as $ from 'jquery';
@Component({
    templateUrl:'./header.component.html',
    selector:'app-header',
    styles:['./header.component.scss']
})
export class HeaderComponent implements OnInit{
   
//   @Output() featureSelected =new EventEmitter<string>();
LogOutDisabled =true;
username:string="";
  constructor(private authService:AuthenticationService){
   
  }
  ngOnInit(): void {
   
      $(document).on('click', function (e){
          if(e.hasOwnProperty('originalEvent')){
            var menu_opened = $('#navbutton').hasClass('collapsed');
            //console.log(menu_opened)
            if(!menu_opened === true){
                $('#navbutton').click();  
            }
          }
        
    });    
      this.authService.currentModuleTitle.subscribe(()=>{
       this.username= localStorage.getItem("UserName");

   this.LogOutDisabled =false;
      })
   if(this.authService.getJwtToken()){
   this.LogOutDisabled =false;
   }
   else{
    this.LogOutDisabled =true;
   }
}
public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
onSelect(feature : string){
    console.log(feature)
        this.authService.featureSelected.emit(feature);
        // this.authService.featureSelect(feature);
    }

    LogOut(){
        this.LogOutDisabled =true;
this.authService.doLogoutUser();

    }

}