import { Component, OnInit, ViewChild, ElementRef, Output,EventEmitter } from '@angular/core';
import { Ingredients } from 'src/app/shared/Ingredients.model';
import { ShoppingService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.scss']
})
export class ShoppingItemComponent implements OnInit {

  @ViewChild('nameInput', {static: false}) nameInputRef :ElementRef;
  @ViewChild('amountInput', {static: false}) amountInputRef :ElementRef;
// @Output() IngredientsAdded = new EventEmitter<Ingredients>();
  constructor(private shoppingService:ShoppingService) { }

  ngOnInit() {
  }
  AddIngredient(){
    const ingName=this.nameInputRef.nativeElement.value;
    const ingAmount=this.amountInputRef.nativeElement.value;
    const ingredient=new Ingredients(ingName,ingAmount);
    // this.IngredientsAdded.emit(ingredient);
    this.shoppingService.AddIngredient(ingredient);
  }
}
