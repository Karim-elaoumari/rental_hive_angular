import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable(
    {
        providedIn: 'root'
    }
)
export class ModelService{
    constructor(private http:HttpClient) { }
    public getModelsByFamily(family:string): Observable<any>{
        return this.http.get("http://localhost:8081/api/v1/models/family/"+family);
    }
}