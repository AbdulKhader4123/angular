import { Component, OnInit, Input,Renderer2, ViewChild, ElementRef,  } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { RecipeService } from '../shared/recipe.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

@Input() loadedFeature='home';
onNavigate(feature : string)
{
  this.loadedFeature=feature;
}

constructor(private authService: AuthenticationService,private recipeService: RecipeService)
{
  this.authService.featureSelected.subscribe((feature : string)=>{
  this.loadedFeature=feature;
})
}

ngOnInit()
{
  if(this.recipeService.selectedCat){
    var arr= Array.from(document.getElementById('nav-tab').children) 
    arr.forEach((elem)=>{
      elem.classList.remove('active');
      if(elem.id.toLowerCase()==this.recipeService.selectedCat){
      elem.classList.add('active');

      }
    })
  }
 
  var self = this;
  $(function() {

  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            var selectedds = (e.target as Element).id;
            self.tabChange(selectedds); 
            console.log(selectedds)
         }); 

  }); 
 
 this.onNavigate(this.loadedFeature);
 this.authService.featureSelected.subscribe((feature : string)=>{   this.loadedFeature=feature;
})
}

tabChange(selectedds:string){

   this.authService.TabChangeobsMethod(selectedds);
}
};
