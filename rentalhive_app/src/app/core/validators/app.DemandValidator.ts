import { Injectable } from "@angular/core";

@Injectable(
    {
        providedIn: 'root'
    }
)
export class DemandValidator{
    constructor() { }
    public validateDemand(demand:any): Array<string> {
    
        let errors = new Array<string>();
        if(demand.title == null || demand.title == ""){
            errors.push("Title is required");
        }
        if(demand.description == null || demand.description == ""){
            errors.push("Description is required");
        }
        if(demand.equipmentDemands == null || demand.equipmentDemands.length == 0){
            errors.push("Demand Equipments  are required");
        }
        return errors;
    }
}