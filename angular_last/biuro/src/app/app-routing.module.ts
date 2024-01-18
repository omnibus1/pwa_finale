import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomePageComponent } from './components/home/home-page/home-page.component';
import { AdminPageComponent } from './components/admin/admin-page/admin-page.component';
import { ManagePageComponent } from './components/manage/manage-page/manage-page.component';
import { WycieczkiPageComponent } from './components/wycieczki/wycieczki-page/wycieczki-page.component';
import { HistoriaPageComponent } from './components/historia/historia-page/historia-page.component';
import { KoszykPageComponent } from './components/koszyk/koszyk-page/koszyk-page.component';
import { WycieczkaPageComponent } from './components/wycieczka/wycieczka-page/wycieczka-page.component';
import { WycieczkaFormComponent } from './components/manage/wycieczka-form/wycieczka-form.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path: '', component:HomePageComponent,},
  {path: 'login', component:LoginComponent,},
  {path: 'register', component:RegisterComponent},
  {path: 'home', component:HomePageComponent},
  {path: 'admin', component:AdminPageComponent,canActivate:[AuthGuard]},
  {path: 'manage', component:ManagePageComponent,canActivate:[AuthGuard]},
  {path: 'wycieczki', component:WycieczkiPageComponent},
  {path: 'koszyk', component:KoszykPageComponent,canActivate:[AuthGuard]},
  {path: 'historia', component:HistoriaPageComponent,canActivate:[AuthGuard]},
  {path: 'wycieczka/:id', component:WycieczkaPageComponent,canActivate:[AuthGuard]},
  {path: 'edit_wycieczka/:id', component:WycieczkaFormComponent,canActivate:[AuthGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
