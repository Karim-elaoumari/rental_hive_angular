
import { Model } from "src/app/core/models/app.model";


export class ModelState {
    static models : Model[]= [];

    static getModels(): Model[] {
        
         return ModelState.models;
        
    }
    static setModels(models: Model[]) {
            
            ModelState.models = models;
    }
    static addModel(model: Model) {
        ModelState.models.push(model);
    }
    static deleteModel(model: Model) {
        ModelState.models = ModelState.models.filter(e => e.id !== model.id);
    }
}