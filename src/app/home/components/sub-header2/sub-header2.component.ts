import { Component, OnInit } from '@angular/core';
import { ApiService } from '@shared/apiService/api.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-sub-header2',
  templateUrl: './sub-header2.component.html',
  styleUrls: ['./sub-header2.component.scss'],
})
export class SubHeader2Component implements OnInit {
  data: any;
  isLoading: boolean;
  addClass: boolean;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {
    this.route.url.subscribe((res:any)=> {
      if(res[0].path=='component2') {
        this.addClass= true;
      }
      else {
        this.addClass=  false;

      }
    })
  }

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
