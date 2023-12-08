import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable(
    {
        providedIn: 'root'
    }
)
export class DemandService{
    constructor(private http:HttpClient) { }
    public createDemand(demand:any): Observable<any>{
        return this.http.post("http://localhost:8081/api/v1/demands", demand);
    }
    public getDemands(page:number,size:number): Observable<any>{
        return this.http.get("http://localhost:8081/api/v1/demands?page="+page+"&size="+size);
    }
    public getDemandById(id:number): Observable<any>{
        return this.http.get("http://localhost:8081/api/v1/demands/"+id);
    }
    public validateDemand(id:number): Observable<any>{
        return this.http.put("http://localhost:8081/api/v1/demands/"+id+"/validate",null);
    }
    public getDifOfEquipment(demand_id:number, equipment_id:number): Observable<any>{
        return this.http.get("http://localhost:8081/api/v1/demands/"+demand_id+"/equipment/"+equipment_id+"/diff");
    }
}