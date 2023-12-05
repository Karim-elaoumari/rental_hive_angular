import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipementComponent } from './client/equipement/equipement.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EquipementComponent 
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ]
})
export class FeatureModule { }
