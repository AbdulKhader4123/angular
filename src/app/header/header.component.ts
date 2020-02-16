import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { Router } from '@angular/router';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Component({
    templateUrl:'./header.component.html',
    selector:'app-header',
    styles:['./header.component.scss']
})
export class HeaderComponent implements OnInit{
   
//   @Output() featureSelected =new EventEmitter<string>();
LogOutDisabled =true;
  constructor(private authService:AuthenticationService){
   
  }
  ngOnInit(): void {
   
      $(document).on('click', function (e){
          if(e.hasOwnProperty('originalEvent')){
            var menu_opened = $('#navbutton').hasClass('collapsed');
            console.log(menu_opened)
            if(!menu_opened === true){
                $('#navbutton').click();  
            }
          }
        
    });
      this.authService.currentModuleTitle.subscribe(()=>{
   this.LogOutDisabled =false;
   console.log("123456")
      })
   if(this.authService.getJwtToken()){
   this.LogOutDisabled =false;
   }
   else{
       console.log("77777777777")
    this.LogOutDisabled =true;
   }
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