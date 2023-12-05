import { EquipementComponent } from "src/app/feature/client/equipement/equipement.component";
import { Equipment } from "../models/app.Equipment";
import { EquipmentState } from "src/app/store/equipment_state/app.equipmentState";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable(
    {
        providedIn: 'root'
    }
)
export class EquipementService{
    constructor(private http: HttpClient) { }
    getEquipments(): Observable<any>{
        return this.http.get("http://localhost:8081/api/v1/equipments");
    }
}