
import { EquipmentDemandResp } from "./app.EquipmentDemandResp";
import { User } from "./app.User";

export interface DemandResp {
    id: number;
    title: string;
    user: User;
    description: string;
    equipmentDemands: EquipmentDemandResp[];
    status: string;
}
