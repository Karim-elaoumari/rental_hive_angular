import { Equipment } from "./app.Equipment";
import { EquipmentDemand } from "./app.EquipmentDemand";
import { User } from "./app.User";

export interface Demand {
    id: number;
    title: string;
    user: User;
    description: string;
    equipmentDemands: EquipmentDemand[];
    status: string;
}
