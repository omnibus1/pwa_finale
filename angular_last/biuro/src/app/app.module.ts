import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/nav/navbar/navbar.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { HomePageComponent } from './components/home/home-page/home-page.component';
import { AuthGuard } from './guard/auth.guard';
import { AdminPageComponent } from './components/admin/admin-page/admin-page.component';
import { ManagePageComponent } from './components/manage/manage-page/manage-page.component';
import { WycieczkiPageComponent } from './components/wycieczki/wycieczki-page/wycieczki-page.component';
import { KoszykPageComponent } from './components/koszyk/koszyk-page/koszyk-page.component';
import { HistoriaPageComponent } from './components/historia/historia-page/historia-page.component';
import { WycieczkaItemComponent } from './components/wycieczki/wycieczka-item/wycieczka-item.component';
import { NavbarBasketComponent } from './components/nav/navbar-basket/navbar-basket.component';
import { CurrencyChangerComponent } from './components/nav/currency-changer/currency-changer.component';
import { KoszykItemComponent } from './components/koszyk/koszyk-item/koszyk-item.component';
import { HistoriaItemComponent } from './components/historia/historia-item/historia-item.component';
import { WycieczkaPageComponent } from './components/wycieczka/wycieczka-page/wycieczka-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WycieczkaManageItemComponent } from './components/manage/wycieczka-manage-item/wycieczka-manage-item.component';
import { WycieczkaFormComponent } from './components/manage/wycieczka-form/wycieczka-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserItemComponent } from './components/admin/user-item/user-item.component';
import { WycieczkaPipe } from './pipes/wycieczka-pipe';
import { PriceSliderComponent } from './components/price-slider/price-slider.component';
import { MatSliderModule } from '@angular/material/slider';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpInterceptor, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { KupionePipe } from './pipes/kupione-pipe';
import { PaginationComponent } from './components/pagination/pagination.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomePageComponent,
    AdminPageComponent,
    ManagePageComponent,
    WycieczkiPageComponent,
    KoszykPageComponent,
    HistoriaPageComponent,
    WycieczkaItemComponent,
    NavbarBasketComponent,
    CurrencyChangerComponent,
    KoszykItemComponent,
    HistoriaItemComponent,
    WycieczkaPageComponent,
    WycieczkaManageItemComponent,
    WycieczkaFormComponent,
    UserItemComponent,
    WycieczkaPipe,
    PriceSliderComponent,
    KupionePipe,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule
  ],
  providers: [
    provideClientHydration(),
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
