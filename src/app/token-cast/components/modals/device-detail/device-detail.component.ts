import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ApiService } from '@app/@shared/apiService/api.service';
import { SharedService } from '@app/@shared/services/shared.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Vibrant from 'node-vibrant';
import { MediaObserver } from '@angular/flex-layout';
@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.scss'],
})
export class DeviceDetailComponent implements OnInit {
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
  vertical = false;
  tickInterval = 1;
  bg_Colors: Array<any> = [];
  transformImg: any = 'rotate(0deg)';
  fitImage: String = 'cover';
  border: String = '0px solid transparent';
  deviceDetails: any = {};
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public modalService: NgbModal,
    private _location: Location,
    private apiService: ApiService,
    private media: MediaObserver,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.close();
    this.getDetails();
  }

  close() {
    this.modalService.dismissAll();
  }

  getDetails() {
    this.sharedService.sharedServiceData.subscribe((res: any) => {
      this.deviceDetails = res;
      if (this.deviceDetails == 0) {
        this.close();
      } else {
        this.setImgAttributes(this.deviceDetails);
      }
    });
  }

  setImgAttributes(data: any) {
    var img = document.createElement('img');
    img.setAttribute('src', data.img);
    this.getVibrantColor(data.img);
  }

  getVibrantColor(url: string) {
    Vibrant.from(url).getPalette((err, palette) => {
      for (var i in palette) {
        let obj = { color: palette[i].hex };
        this.bg_Colors.push(obj);
      }
    });
  }

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }

  transformPicture(e: any) {
    console.log('@@');
    if (e.checked) this.transformImg = 'rotate(180deg)';
    else this.transformImg = 'rotate(0deg)';
  }

  fitPicture(e: any) {
    if (e.checked) this.fitImage = 'contain';
    else this.fitImage = 'cover';
  }

  getSliderTickInterval(): number | 'auto' {
    this.border = this.value + 'px solid transparent';
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }
}
