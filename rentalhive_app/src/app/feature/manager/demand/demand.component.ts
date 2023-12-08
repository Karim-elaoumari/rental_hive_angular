import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Demand } from 'src/app/core/models/app.Demand';
import { DemandResp } from 'src/app/core/models/app.DemandResp';
import { DemandService } from 'src/app/core/services/app.DemandService';
import { DemandState } from 'src/app/store/demand_state/app.demand_state';

@Component({
  selector: 'app-demand',
  templateUrl: './demand.component.html',
  styleUrls: ['./demand.component.css']
})
export class DemandComponent {
  demands: DemandResp[] = [];
  page: number = 0;
  size: number = 10;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private demandService: DemandService,
  ) { }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.page = +params['page'] || 0;
      this.size = +params['size'] || 10;
    });
    this.demands = DemandState.getDemands(this.page, this.size);
    if (this.demands.length === 0) {
      this.demandService.getDemands(this.page, this.size).subscribe(
        (data) => {
          this.demands = data.data as DemandResp[];
          DemandState.setDemands(data.data as DemandResp[], this.page, this.size);
        },
        (error) => {
          alert("Error while getting demands");
        }
      )
    }

  }
  onPageChange(page: number) {
    this.page = page;
    this.demands = DemandState.getDemands(this.page, this.size);
    if (this.demands.length === 0) {
      this.demandService.getDemands(this.page, this.size).subscribe(
        (data) => {
          this.demands = data.data as DemandResp[];
          DemandState.setDemands(data.data as DemandResp[], this.page, this.size);
        },
        (error) => {
          alert("Error while getting demands");
        }
      )
    }
    this.router.navigate(['/manager/demands'], { queryParams: { page: page, size: this.size } });

  }
  manageDemand(dm_id: number) {
    this.router.navigate(['/manager/demand', dm_id]);
  }



}
