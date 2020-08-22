import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {  Router, NavigationStart,NavigationEnd, Scroll} from '@angular/router';
import { Location, PopStateEvent, ViewportScroller } from "@angular/common";
import { filter, delay } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'abuka';
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];

  constructor(private router: Router,private viewportScroller: ViewportScroller){
      this.router.events
      .pipe(
        filter((e: Scroll): e is Scroll => e instanceof Scroll),
        delay(0),
      )
      .subscribe(e => {
        if (e.position) {
          viewportScroller.scrollToPosition(e.position);
        } else if (e.anchor) {
          viewportScroller.scrollToAnchor(e.anchor);
        } else {
          viewportScroller.scrollToPosition([0, 0]);
        }
      });
  } 

ngOnInit(): void {

//     this.location.subscribe((ev:any) => {
//       alert(ev.url)
//       this.lastPoppedUrl = ev.url;
//   });
//   this.router.events.subscribe((ev:any) => {
//       if (ev instanceof NavigationStart) {
//           if (ev.url != this.lastPoppedUrl)
//          // alert("a"+window.scrollY)
//               this.yScrollStack.push(window.scrollY);
//       } else if (ev instanceof NavigationEnd) {
//         //alert(this.yScrollStack.pop())
// //alert(ev.url)
// //alert(this.lastPoppedUrl)
//           if (ev.url == this.lastPoppedUrl) {
//               this.lastPoppedUrl = undefined;
//               window.scrollTo(0, this.yScrollStack.pop());
//           } else
//               window.scrollTo(0, 0);
//       }
//   });
//     this.sub=  this.route.events
// .forEach((event) => {
//   if(event instanceof NavigationStart) {
//     if(event.url.indexOf('profile')>=0 ||event.url=='/'||event.url.indexOf('product')>=0 ){
// this.footerEnabler=true;
// console.log(this.footerEnabler)
//     }
//     else{
// this.footerEnabler=false;
// console.log(this.footerEnabler)
//     }
//   }
// });
}
ngOnDestroy() {
}
}
 