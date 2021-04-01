import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
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
  cardModel: any = [];
  irrigationModel: any = [];
  constructor(private apiService: ApiService, private media: MediaObserver) {}

  ngOnInit(): void {
    this.getData();
    this.getUpdatedData();
    this.setModel();
    this.setIrrigationModel();
  }

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }

  setModel() {
    this.cardModel = [
      {
        id: 1,
        img: 'assets/Group 6.svg',
        text: 'Moisture',
        img_text: '51 KPA',
      },
      { id: 2, img: 'assets/Group_cloud.svg', text: 'C02', img_text: '45%' },
      { id: 3, img: 'assets/Vector.svg', text: 'VPD', img_text: '1.1' },
      {
        id: 4,
        img: 'assets/Vector_bulb.svg',
        text: 'PAR',
        img_text: '700 µmols',
      },
    ];
  }

  setIrrigationModel() {
    this.irrigationModel = [
      {
        id: 1,
        img: 'assets/carbon_temperature-hot.svg',
        text: 'pH',
        img_text: '6',
      },
      {
        id: 2,
        img: 'assets/carbon_ibm-cloud.svg',
        text: 'Electrical Conductivity',
        img_text: '.05 µS/cm',
      },
      {
        id: 3,
        img: 'assets/images/icon/Vector.png',
        text: 'Total Dissolved Solids',
        img_text: '700 µmol',
      },
    ];
  }

  setLoadingSpinner(observable: Observable<any>) {
    this.isLoading = true;
    observable.subscribe(() => (this.isLoading = false));
  }

  getData() {
    this.irrigationData = this.apiService.getIrrigationData();
    // this.recipeGrowthData = this.apiService.getRecipeGrowthPlan();
    this.recipeGrowthData = this.apiService.getRecipeeGrowthPlanData();
    this.setLoadingSpinner(this.irrigationData);
    this.setLoadingSpinner(this.recipeGrowthData);
  }

  getUpdatedData() {
    this.apiService.actionSubject.subscribe((res: any) => {
      if (res == 1) {
        this.getData();
      }
    });
  }
}
