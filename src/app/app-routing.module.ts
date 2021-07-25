import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {GradesComponent} from './grades/grades.component';
import {ImprintComponent} from './imprint/imprint.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {InternalErrorComponent} from './internal-error/internal-error.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'grades', component: GradesComponent},
  {path: 'imprint', component: ImprintComponent},
  {path: 'error', component: InternalErrorComponent},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
