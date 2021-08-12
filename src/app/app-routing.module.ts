import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudinfoComponent } from './studinfo/studinfo.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/stud' },
  { path: 'stud', component: StudinfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
