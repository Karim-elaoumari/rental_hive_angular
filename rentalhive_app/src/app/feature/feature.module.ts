import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipementComponent } from './client/equipement/equipement.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DemandComponent } from './manager/demand/demand.component';
import { DemandDetailComponent } from './manager/demand-detail/demand-detail.component';



@NgModule({
  declarations: [
    EquipementComponent,
    DemandComponent,
    DemandDetailComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ]
})
export class FeatureModule { }
