import { Equipment } from "src/app/core/models/app.Equipment";

export class EquipmentState {
    static equipments: Equipment[]= [];
    static getEquipments(): Equipment[] {
        return EquipmentState.equipments;
    }
    static setEquipments(equipments: Equipment[]) {
        EquipmentState.equipments = equipments;
    }
    static addEquipment(equipment: Equipment) {
        EquipmentState.equipments.push(equipment);
    }
    static deleteEquipment(equipment: Equipment) {
        EquipmentState.equipments = EquipmentState.equipments.filter(e => e.id !== equipment.id);
    }
}