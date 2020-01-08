import { Component, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { Router } from '@angular/router';

@Component({
    templateUrl:'./header.component.html',
    selector:'app-header',
    styles:['./header.component.scss']
})
export class HeaderComponent{
  @Output() featureSelected =new EventEmitter<string>();

  constructor(private authService:AuthenticationService,private route:Router){

  }
onSelect(feature : string){
        this.featureSelected.emit(feature);
    }

    LogOut(){
this.authService.doLogoutUser();
this.route.navigate(['/login'])
    }

}