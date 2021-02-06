import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '@app/@shared/apiService/api.service';
import { Observable, Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-green-crack',
  templateUrl: './green-crack.component.html',
  styleUrls: ['./green-crack.component.scss'],
})
export class GreenCrackComponent implements OnInit {
  @Input('details') data: Observable<any>;
  subscription: Subscription;
  details: any;

  constructor(private apiService: ApiService, private _location: Location) {}

  ngOnInit(): void {
    console.log(this.data);
    this.getDetails();
  }
  getDetails() {
    this.subscription = this.apiService.detailsSubject.subscribe(async (res: any) => {
      this.details = res;
      console.log(this.details);
      if (this.details == 0) {
        this._location.back();
      } else {
      }
    });
  }
}
