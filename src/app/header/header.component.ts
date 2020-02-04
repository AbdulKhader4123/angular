import { Component, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { Router } from '@angular/router';

@Component({
    templateUrl:'./header.component.html',
    selector:'app-header',
    styles:['./header.component.scss']
})
export class HeaderComponent{
//   @Output() featureSelected =new EventEmitter<string>();

  constructor(private authService:AuthenticationService){

  }
onSelect(feature : string){
    console.log(feature)
        this.authService.featureSelected.emit(feature);
        // this.authService.featureSelect(feature);
    }

    LogOut(){
this.authService.doLogoutUser();

    }

}