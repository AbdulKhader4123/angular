import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule,NgxUiLoaderHttpModule  } from 'ngx-ui-loader';
import { ToastrModule } from 'ngx-toastr';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import {  SortService, FilterService, GroupService } from '@syncfusion/ej2-angular-grids';
import { AppComponent } from './app.component';
import { routing }   from './app.routing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import {HeaderComponent} from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import {DropdownDirective} from './shared/DropDownDirective';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/guards/auth-guard.service';
import { TokenInterceptor } from './auth/token.interceptor';
import { AuthModule } from './auth/auth.module';
import { AnonymousGuard } from './auth/guards/anonymous-guard.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {
  NgxUiLoaderConfig,

} from 'ngx-ui-loader';
import { EditproductComponent } from './editproduct/editproduct.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  "bgsColor": "#563d7c",
  "bgsOpacity": 0.7,
  "bgsPosition": "center-center",
  "bgsSize": 70,
  "bgsType": "three-strings",
  // "bgsType": "square-jelly-box",
  "blur": 6,
  "delay": 0,
  "fgsColor": "#563d7c",
  "fgsPosition": "center-center",
  "fgsSize": 90,
  "fgsType": "cube-grid",
  "gap": 53,
  "logoPosition": "center-center",
  "logoSize": 120,
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(40, 40, 40, 0.8)",
  // "pbColor": "#fffbfb",
  "pbColor": "#edeb00",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": true,
  // "text": "Adf fashion",
  // "textColor": "#FFFFFF",
  // "textPosition": "center-center",
  "maxTime": -1,
  //set 300 or more to view foreground spinner
  "minTime": 0
};
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    DropdownDirective,
    HomeComponent,
    EditproductComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    routing,
    HttpClientModule,
    AuthModule,
    NgbModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    PinchZoomModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule,// import NgxUiLoaderRouterModule. By default, it will show foreground loader.
    NgxUiLoaderHttpModule.forRoot({ exclude: ['/api/user/getAddress','/api/user/EditAddress','/api/products/cart'] }),
    GridModule,
    // NgxPaginationModule,
    InfiniteScrollModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},AuthGuard,AnonymousGuard,
    SortService,
    FilterService,
    GroupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
