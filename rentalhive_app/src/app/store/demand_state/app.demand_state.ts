import { Demand } from "src/app/core/models/app.Demand";
import { DemandResp } from "src/app/core/models/app.DemandResp";
import { Family } from "src/app/core/models/app.family";


export class DemandState {
    static demands: DemandResp[]= [];
    static page: number=0;
    static size: number=10;
    static getDemands(page:number,size:number): DemandResp[] {
         if(page != DemandState.page || size != DemandState.size){
                return [];
        }
         return DemandState.demands;
       
        
    }
    static setDemands(demands: DemandResp[],page:number,size:number) {
            DemandState.demands = demands;
            DemandState.page = page;
            DemandState.size = size;
    }
    // static addDemand(family: Family) {
    //     FamilyState.families.push(family);
    // }
    // static deleteFamily(family: Family) {
    //     FamilyState.families = FamilyState.families.filter(e => e.id !== family.id);
    // }
}