import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '@app/@shared/apiService/api.service';
import { Observable, Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { debounce } from 'lodash';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '@app/@shared/services/shared.service';
import { Confirm } from '@app/@shared/components/confirm';
import { MediaObserver } from '@angular/flex-layout';
@Component({
  selector: 'app-lights-detail',
  templateUrl: './lights-detail.component.html',
  styleUrls: ['./lights-detail.component.scss'],
})
export class LightsDetailComponent implements OnInit {
  recipee_details: any = [];
  runTimeDetails: any = [];
  @Input() lightsNamesData: Observable<any>;
  @Input() lightsRunTimeData: Observable<any>;
  @ViewChild('confirm') public confirm: Confirm;
  lightsData: any;
  constructor(
    public apiService: ApiService,
    private router: Router,
    private _location: Location,
    private _formBuilder: FormBuilder,
    private sharedService: SharedService,
    private media: MediaObserver
  ) {}

  ngOnInit(): void {
    this.lightsNamesData.subscribe((res: any) => {
      this.lightsData = res;
      console.log(this.lightsData);
    });
  }

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }

  deleteRoutine(data?: any) {}
  editRoutine(data?: any) {}
  addRoutine() {}
  isEmptyObject(data?: any) {}
  editCycle(data?: any) {}
  addCycle() {}

  openRecipeModal() {
    let obj: any = {
      type: 'add',
      data: this.lightsData,
    };
    this.sharedService.sharedServiceData.next(obj);
    this.router.navigate(['/component2/', { outlets: { RECIPEE_MODAL: ['add-new', 'Add New'] } }]);
  }

  editRecipeModal(data: any) {
    let obj: any = {
      type: 'edit',
      data: this.lightsData,
      rowData: data,
    };
    this.sharedService.sharedServiceData.next(obj);
    this.router.navigate(['/component2/', { outlets: { RECIPEE_MODAL: ['add-new', 'Edit'] } }]);
  }
  delete(data: any) {
    var obj: any = {
      id: this.lightsData.id,
      name: this.lightsData.name,
      data: [...this.lightsData.data],
    };
    var index = obj.data
      .map((x: any) => {
        return x.id;
      })
      .indexOf(data.id);
    obj.data.splice(index, 1);

    this.confirm.show(`Are you sure you want to delete?`).then((opt) => {
      if (opt == true) {
        this.apiService.putRecipe_detail_lights_name(obj).subscribe(
          (res: any) => {
            this.apiService.actionSubject.next(2);
          },
          (error: any) => {}
        );
      }
    });
  }
}
