import { Equipment } from "src/app/core/models/app.Equipment";

export class EquipmentState {
    static equipments: Equipment[]= [];
    static page: number = 0;
    static size: number = 10;
    static family: string = '';
    static model: string = '';
    static getEquipments(page:number,size:number,family:string,model:string): Equipment[] {
        if(page != EquipmentState.page || size != EquipmentState.size || family != EquipmentState.family || model != EquipmentState.model){
            return [];
        }else{
         return EquipmentState.equipments;
        }
    }
    static setEquipments(equipments: Equipment[],page:number,size:number,family:string,model:string) {
        EquipmentState.page = page;
        EquipmentState.size = size;
        EquipmentState.family = family;
        EquipmentState.model = model;
        EquipmentState.equipments = equipments;
    }
    static addEquipment(equipment: Equipment) {
        EquipmentState.equipments.push(equipment);
    }
    static deleteEquipment(equipment: Equipment) {
        EquipmentState.equipments = EquipmentState.equipments.filter(e => e.id !== equipment.id);
    }
}