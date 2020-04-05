import { Component, OnInit, Input,  } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';


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

constructor(private authService: AuthenticationService)
{
  this.authService.featureSelected.subscribe((feature : string)=>{
  this.loadedFeature=feature;
})
}

ngOnInit()
{
  var self = this;
  $(function() {

  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            var selectedds = (e.target as Element).id;
            self.tabChange(selectedds); 
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
