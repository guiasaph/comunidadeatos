import { componentFactoryName } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AppComponent } from './app.component';
import { CadastroMembroComponent } from './cadastro-membro/cadastro-membro.component';
import { MainPageComponent } from './main-page/main-page.component';


const routes: Routes = [{
  path: '',
  component: MainPageComponent
},
{
  path: 'login',
  component: AdminLoginComponent
},
{
  path: 'cadastro-membro',
  component: CadastroMembroComponent
},
{
  path: 'admin-panel',
  component: AdminPanelComponent,
  canActivate: [AdminLoginComponent]
},
{
  path: '**',
  component: MainPageComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AdminLoginComponent]
})
export class AppRoutingModule { }