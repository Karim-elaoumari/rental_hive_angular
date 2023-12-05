import { Component } from '@angular/core';
import { Equipment } from 'src/app/core/models/app.Equipment';
import { EquipementService } from 'src/app/core/services/app.EquipmentService';
import { EquipmentState } from 'src/app/store/equipment_state/app.equipmentState';

@Component({
  selector: 'app-equipement',
  templateUrl: './equipement.component.html',
  styleUrls: ['./equipement.component.css']
})
export class EquipementComponent {
  equipments: Equipment[] = [];
  isChecked: boolean[] = [];
  constructor(private equipmentService: EquipementService) {
  }
  ngOnInit() {
    this.equipments = EquipmentState.getEquipments();
    if(this.equipments.length === 0){
      this.equipmentService.getEquipments().subscribe(
        (data) => {
          this.equipments = data.data as Equipment[];
          EquipmentState.setEquipments(data.data as Equipment[]);
          this.isChecked = new Array(this.equipments.length).fill(false);
        }
      )
    }else{
      this.isChecked = new Array(this.equipments.length).fill(false);
    }
  }
  onChange(index:number) {
    this.isChecked[index] = !this.isChecked[index];
  }
}
