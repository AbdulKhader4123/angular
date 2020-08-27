import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
// import * as $ from 'jquery';
@Component({
    templateUrl:'./header.component.html',
    selector:'app-header',
    styles:['./header.component.scss']
})
export class HeaderComponent implements OnInit{
   
LogOutDisabled =true;
username:string="";
role:string="";
obs:Subscription
constructor(private authService:AuthenticationService,private route:Router){}
  
ngOnInit(): void {
document.addEventListener('click',function (e){
  if(e.isTrusted){
    let elementId: string = (event.target as Element).id;
    var menu_opened = document.getElementById('navbutton').classList.contains('collapsed');
    if(!menu_opened === true && elementId!="navbarDropdownMenuLink-333"){
      document.getElementById('navbutton').click();  
    }
  }
})

this.obs =this.authService.currentModuleTitle.subscribe(()=>{
this.username= localStorage.getItem("UserName");
this.role= localStorage.getItem("role");
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
this.authService.featureSelected.emit(feature);
if(this.route.url!='/'){
  this.authService.TabChangeobsMethod("kurti");
}
}

LogOut(){
this.LogOutDisabled =true;
this.authService.doLogoutUser();
}
ngOnDestroy(){
  this.obs.unsubscribe();
}
}