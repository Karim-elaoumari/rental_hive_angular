import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Demand } from 'src/app/core/models/app.Demand';
import { DemandResp } from 'src/app/core/models/app.DemandResp';
import { DemandService } from 'src/app/core/services/app.DemandService';
import { DemandState } from 'src/app/store/demand_state/app.demand_state';

@Component({
  selector: 'app-demand-detail',
  templateUrl: './demand-detail.component.html',
  styleUrls: ['./demand-detail.component.css']
})
export class DemandDetailComponent {

  demand:DemandResp = {} as DemandResp;
  dm_id: any = 0;
  constructor(
    private route: ActivatedRoute,
    private demandService: DemandService,
  ) { }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.dm_id = params.get('id') || 0;
        this.demandService.getDemandById(this.dm_id).subscribe(
          (data) => {
            this.demand = data.data as DemandResp;
          },
          (error) => {
            alert("Error while getting demand");
          }
        )
    });

  }
  validateDemand(){
    this.demandService.validateDemand(this.demand.id).subscribe(
      (data) => {
        this.demand = data.data as DemandResp;
      },
      (error) => {
        alert("Error while validating demand: "+error.error.message);
      }
    )
  }
  checkInReview(){
    return this.demand.status != "IN_REVIEW";
  }
  checkInNegotiation(){
    return this.demand.status != "PENDING_NEGOTIATION" && this.demand.status != "IN_REVIEW";
  }
  checkInContract(){
    return this.demand.status != "PENDING_CONTRACT_CREATION" && this.demand.status != "PENDING_NEGOTIATION" && this.demand.status != "IN_REVIEW";
  }
  checkInSign(){
    return this.demand.status != "PENDING_CONTRACT_DEAL" && this.demand.status != "PENDING_CONTRACT_CREATION" && this.demand.status != "PENDING_NEGOTIATION" && this.demand.status != "IN_REVIEW";
  }
  checInWon():boolean{
    return this.demand.status == "WON";
  }
}
