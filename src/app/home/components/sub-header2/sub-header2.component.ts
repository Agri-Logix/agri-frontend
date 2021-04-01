import { Component, OnInit } from '@angular/core';
import { ApiService } from '@shared/apiService/api.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-sub-header2',
  templateUrl: './sub-header2.component.html',
  styleUrls: ['./sub-header2.component.scss'],
})
export class SubHeader2Component implements OnInit {
  data: any;
  isLoading: boolean;
  addClass: boolean;
  lightsData: Observable<any>;
  lightsNamesData: Observable<any>;
  lightsRunTimeData: Observable<any>;

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) {
    this.getRecipeDetailLights(1);
    this.getRecipeDetailLightsName(1);
    this.getRecipeDetailLightsRuntime(1);
    this.getUpdatedData();
    this.route.url.subscribe((res: any) => {
      console.log(res);

      if (res[0].path == 'component2') {
        this.addClass = true;
        console.log(this.addClass);
      } else {
        this.addClass = false;
      }
    });
  }

  ngOnInit(): void {
    this.getIrrigationData();
  }

  setLoadingSpinner(observable: Observable<any>) {
    this.isLoading = true;
    observable.subscribe(() => (this.isLoading = false));
  }

  getRecipeDetailLights(id?: any) {
    this.lightsData = this.apiService.getRecipe_detail_lights(id);
    this.setLoadingSpinner(this.lightsData);
  }

  getRecipeDetailLightsName(id?: any) {
    this.lightsNamesData = this.apiService.getRecipe_detail_lights_name(id);
    this.setLoadingSpinner(this.lightsNamesData);
  }

  getRecipeDetailLightsRuntime(id?: any) {
    this.lightsRunTimeData = this.apiService.getRecipe_detail_lights_run_time(id);
    this.setLoadingSpinner(this.lightsRunTimeData);
  }

  getIrrigationData() {
    this.data = this.apiService.getIrrigationData();
    this.setLoadingSpinner(this.data);
  }

  getUpdatedData() {
    this.apiService.actionSubject.subscribe((res: any) => {
      console.log('@@@', res);
      if (res == 2) {
        this.getRecipeDetailLights(1);
        this.getRecipeDetailLightsName(1);
        this.getRecipeDetailLightsRuntime(1);
      }
    });
  }
}
