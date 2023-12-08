import { Family } from "src/app/core/models/app.family";


export class FamilyState {
    static families: Family[]= [];
    static getFamilies(): Family[] {
        
         return FamilyState.families;
        
    }
    static setFamilies(families: Family[]) {
            
            FamilyState.families = families;
    }
    static addFamily(family: Family) {
        FamilyState.families.push(family);
    }
    static deleteFamily(family: Family) {
        FamilyState.families = FamilyState.families.filter(e => e.id !== family.id);
    }
}