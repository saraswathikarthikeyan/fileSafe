import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { AuthGuard } from './auth.guard';

import { from } from 'rxjs';

const routes: Routes = [
  { path:'login', component:LoginComponent },
  { path:'fileupload', component:FileuploadComponent /* ,canActivate : [AuthGuard] */ },
  { path:'', redirectTo:'/login', pathMatch:'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
