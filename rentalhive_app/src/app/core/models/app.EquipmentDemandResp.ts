import { Equipment } from "./app.Equipment";

export interface EquipmentDemandResp {
    equipment: Equipment;
    startDate: Date;
    endDate: Date;
}