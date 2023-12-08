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
    getEquipments(page:number,size:number,family:string,model:string): Observable<any>{

            const apiUrl = "http://localhost:8081/api/v1/equipments";
            let urlParams = `?page=${page}&size=${size}`;

            if (family !== null) {
            urlParams += `&family=${family}`;
            }else{
            urlParams += `&family=`;
            }

            if (model !== null) {
            urlParams += `&model=${model}`;
            }else{
            urlParams += `&model=`;
            }
            const fullUrl = apiUrl + urlParams;

            return this.http.get(fullUrl);
    }
}