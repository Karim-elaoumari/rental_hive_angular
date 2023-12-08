import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { EquipementComponent } from './feature/client/equipement/equipement.component';
import { DemandComponent } from './feature/manager/demand/demand.component';
import { DemandDetailComponent } from './feature/manager/demand-detail/demand-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 
  { path: 'home', component: HomeComponent },
  { path: 'equipments', component: EquipementComponent},
  { path: 'manager',children:[
    { path: 'demand', component: DemandComponent},
    { path: 'demand/:id', component: DemandDetailComponent}
  ]
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
