import { Component, OnInit } from '@angular/core';
import { ApiService } from '@shared/apiService/api.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-sub-header1',
  templateUrl: './sub-header1.component.html',
  styleUrls: ['./sub-header1.component.scss'],
})
export class SubHeader1Component implements OnInit {
  irrigationData: Observable<any>;
  isLoading: boolean;
  recipeGrowthData: Observable<any>;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getData();
    this.getUpdatedData();
  }

  setLoadingSpinner(observable: Observable<any>) {
    this.isLoading = true;
    observable.subscribe(() => (this.isLoading = false));
  }

  getData() {
    this.irrigationData = this.apiService.getIrrigationData();
    this.recipeGrowthData = this.apiService.getRecipeGrowthPlan();
    this.setLoadingSpinner(this.irrigationData);
    this.setLoadingSpinner(this.recipeGrowthData);
  }

  getUpdatedData() {
    this.apiService.actionSubject.subscribe((res:any)=> {
      if(res==1) {
        this.getData();
      }
    })
  }

}
