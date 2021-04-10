import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { ApiService } from '@app/@shared/apiService/api.service';
import { SharedService } from '@app/@shared/services/shared.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  devices: any = [];
  constructor(
    private media: MediaObserver,
    private router: Router,
    private apiService: ApiService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.devicesList();
  }

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }

  devicesList() {
    this.apiService.tokenCastDevices().subscribe((res: any) => {
      this.devices = res;
    });
  }

  deviceDetails(device: any) {
    this.sharedService.sharedServiceData.next(device);
    this.router.navigate(['/token-cast/', { outlets: { DEVICE_DETAIL_MODAL: ['device_detail', 'Device Details'] } }]);
  }
}
