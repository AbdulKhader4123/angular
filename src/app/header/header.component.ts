import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    templateUrl:'./header.component.html',
    selector:'app-header',
    styles:['./header.component.scss']
})
export class HeaderComponent{
  @Output() featureSelected =new EventEmitter<string>();

onSelect(feature : string){
        this.featureSelected.emit(feature);
    }

}