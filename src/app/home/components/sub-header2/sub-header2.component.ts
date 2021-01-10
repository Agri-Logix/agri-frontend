import { Component, OnInit } from '@angular/core';
import { ApiService } from '@shared/apiService/api.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-sub-header2',
  templateUrl: './sub-header2.component.html',
  styleUrls: ['./sub-header2.component.scss'],
})
export class SubHeader2Component implements OnInit {
  data: any;
  isLoading: boolean;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getIrrigationData();
  }

  setLoadingSpinner(observable: Observable<any>) {
    this.isLoading = true;
    observable.subscribe(() => (this.isLoading = false));
  }
  getIrrigationData() {
    this.data = this.apiService.getIrrigationData();
    this.setLoadingSpinner(this.data);
  }
}
