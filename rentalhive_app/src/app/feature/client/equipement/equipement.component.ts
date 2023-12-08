import { Component, OnInit } from '@angular/core';
import { Equipment } from 'src/app/core/models/app.Equipment';
import { EquipmentDemand } from 'src/app/core/models/app.EquipmentDemand';
import { Demand } from 'src/app/core/models/app.Demand';
import { EquipementService } from 'src/app/core/services/app.EquipmentService';
import { EquipmentState } from 'src/app/store/equipment_state/app.equipmentState';
import { DemandService } from 'src/app/core/services/app.DemandService';
import { DemandValidator } from 'src/app/core/validators/app.DemandValidator';
import { User } from 'src/app/core/models/app.User';
import { ActivatedRoute, Router } from '@angular/router';
import { Family } from 'src/app/core/models/app.family';
import { FamilyState } from 'src/app/store/family_state/app.familyState';
import { FamilyService } from 'src/app/core/services/app.FamilyService';
import { Model } from 'src/app/core/models/app.model';
import { ModelService } from 'src/app/core/services/app.ModelService';
import { ModelState } from 'src/app/store/model_state/app.modelState';

@Component({
  selector: 'app-equipement',
  templateUrl: './equipement.component.html',
  styleUrls: ['./equipement.component.css']
})
export class EquipementComponent  implements OnInit{
  familyName: string="";
  modelName: string="";
  page: number= 0;
  size: number = 10;
  
  equipments: Equipment[] = [];
  families: Family[] = [];
  models: Model[] = [];
  demand: Demand = {} as Demand;
  constructor(
    private equipmentService: EquipementService,
    private demandService: DemandService,
    private demandValidator: DemandValidator,
    private route: ActivatedRoute,
    private familyService: FamilyService,
    private router: Router,
    private modelService:ModelService) {
    this.demand.equipmentDemands = [] as EquipmentDemand[]
    
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.familyName = params['family'] || null;
      this.modelName = params['model'] || null;
      this.page = +params['page'] || 0;
      this.size = +params['size'] || 10; 
    });
    this.equipments = EquipmentState.getEquipments(this.page,this.size,this.familyName,this.modelName);
    if(this.equipments.length === 0){
      this.equipmentService.getEquipments(this.page,this.size,this.familyName,this.modelName).subscribe(
        (data) => {
          this.equipments = data.data as Equipment[];
          EquipmentState.setEquipments(data.data as Equipment[],this.page,this.size,this.familyName,this.modelName);
        },
        (error) => {
          alert("Error while getting equipments");
        }
      )
    }
    this.families = FamilyState.getFamilies();
    if(this.families.length === 0){
      this.familyService.getFamilies().subscribe(
        (data) => {
          this.families = data.data as Family[];
          FamilyState.setFamilies(data.data as Family[]);
        },
        (error) => {
          alert("Error while getting families");
        }
      )

    } 
    if(this.familyName != ""){
      this.models = ModelState.getModels();
      if(this.models.length === 0){
        this.modelService.getModelsByFamily(this.familyName).subscribe(
          (data) => {
            this.models = data.data as Model[];
            ModelState.setModels(data.data as Model[]);
          },
          (error) => {
            alert("Error while getting models");
          }
        )
  
      }
    }
   
  }
  onPageChange(newPage: number) {
    this.page = newPage;

    this.equipments = EquipmentState.getEquipments(this.page,this.size,this.familyName,this.modelName);
    if(this.equipments.length === 0){
      this.equipmentService.getEquipments(this.page,this.size,this.familyName,this.modelName).subscribe(
        (data) => {
          this.equipments = data.data as Equipment[];
          EquipmentState.setEquipments(data.data as Equipment[],this.page,this.size,this.familyName,this.modelName);
        }
      )
    }
    this.router.navigate(['/equipments'], {
      queryParams: { family: this.familyName, model: this.modelName, page: this.page, size: this.size},
      queryParamsHandling: 'merge', 
    });
  }
  onChange(eq_id:number) {
    console.log(eq_id);
    let eqd = this.demand.equipmentDemands.find(eq => eq.equipmentId == eq_id);
    if(eqd){
      this.demand.equipmentDemands = this.demand.equipmentDemands.filter(eq => eq.equipmentId !== eq_id);
    }else{
      eqd = {} as EquipmentDemand;
      eqd.equipmentId = eq_id;
      this.demand.equipmentDemands.push(eqd);
    }
    console.log(this.demand.equipmentDemands);
  }
  inDemand(eq_id:number):boolean{
    return this.demand.equipmentDemands.find(eq => eq.equipmentId == eq_id)==null?false:true;
  }
  demandhasEquipments():boolean{
    return this.demand.equipmentDemands.length === 0?false:true;
  }
  addStartDate(eq_id:number, event:any){
    if(event.target.value == null || event.target.value == ""){
      alert("Start date is required");
      event.target.value = "";
    }else if(new Date(event.target.value) < new Date()){
      alert("Start date must be greater than today");
      event.target.value = "";
    }else{
      let eqd = this.demand.equipmentDemands.find(eq => eq.equipmentId == eq_id);
      if(eqd){
        eqd.startDate = event.target.value;
      }
    }
  }
  addEndDate(eq_id:number, event:any){
    let eqd  = this.demand.equipmentDemands.find(eq => eq.equipmentId == eq_id);
    if(eqd && eqd.startDate != null){
    if(event.target.value == null || event.target.value == ""){
      alert("Start date is required");
      event.target.value = "";
    }else if(new Date(event.target.value) < new Date(eqd.startDate)){
      alert("End date must be greater than Start date");
      event.target.value = "";
    }else{
      eqd.endDate = event.target.value;
    }
    }else{
      alert("Start date is required");
      event.target.value = "";
    }
  }
  requestDemand(){
    this.demand.title = "Demand for Equipments";
    this.demand.description = "Demand for Equipments";
    this.demand.user = {
      name: "User 1",
      email: "elaoumarikarim@gmail.com",
      phoneNumber: "0606060606",
      role: "Client"} as User;
   let errors: Array<string> = this.demandValidator.validateDemand(this.demand);
    if(errors.length > 0){
      alert(errors);
    }
    else{
      this.demandService.createDemand(this.demand).subscribe(
        (data) => {
          console.log(data);
          alert("Demand has been created successfully");
        },
        (error) => {
           alert("Error while creating demand");
        })
    }
    
  }
  onSelectedFamilyChange(event: Event){
    if((event.target as HTMLSelectElement).value == "All Families"){
      this.familyName = "";
    }else{
      this.familyName = (event.target as HTMLSelectElement).value;
    }
    this.equipments = EquipmentState.getEquipments(this.page,this.size,this.familyName,this.modelName);
    if(this.equipments.length === 0){
      this.equipmentService.getEquipments(this.page,this.size,this.familyName,this.modelName).subscribe(
        (data) => {
          this.equipments = data.data as Equipment[];
          EquipmentState.setEquipments(data.data as Equipment[],this.page,this.size,this.familyName,this.modelName);
        },
        (error) => {
          alert("Error while getting equipments");
        }
      )
    }
    this.models = ModelState.getModels();
    if(this.models.length === 0){
      this.modelService.getModelsByFamily(this.familyName).subscribe(
        (data) => {
          this.models = data.data as Model[];
          ModelState.setModels(data.data as Model[]);
        },
        (error) => {
          alert("Error while getting models");
        }
      )

    }
    this.router.navigate(['/equipments'], {
      queryParams: { family: this.familyName, model: this.modelName, page: this.page, size: this.size},
      queryParamsHandling: 'merge', 
    });
  }
  onSelectedModelChange(event: Event){
    if((event.target as HTMLSelectElement).value == "All Models"){
      this.modelName = "";
    }
    else{
      this.modelName = (event.target as HTMLSelectElement).value;
    }
    this.equipments = EquipmentState.getEquipments(this.page,this.size,this.familyName,this.modelName);
    if(this.equipments.length === 0){
      this.equipmentService.getEquipments(this.page,this.size,this.familyName,this.modelName).subscribe(
        (data) => {
          this.equipments = data.data as Equipment[];
          EquipmentState.setEquipments(data.data as Equipment[],this.page,this.size,this.familyName,this.modelName);
        },
        (error) => {
          alert("Error while getting equipments");
        }
      )
    }
    this.router.navigate(['/equipments'], {
      queryParams: { family: this.familyName, model: this.modelName, page: this.page, size: this.size},
      queryParamsHandling: 'merge', 
    });
   

  }
}
