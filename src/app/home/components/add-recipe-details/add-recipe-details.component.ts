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
  selector: 'app-recipe-details',
  templateUrl: './add-recipe-details.component.html',
  styleUrls: ['./add-recipe-details.component.scss'],
})
export class AddRecipeDetailsComponent implements OnInit {
  @Input('details') recipee_details: any;
  @Input('runTimeDetails') runTimeDetails: any;

  subscription: Subscription;
  debouncedFunction: any;
  details: any;
  button_text_recipe = 'Edit Recipe';
  button_text_runtimes = 'Edit Routine';
  button_text_addRecipe = 'Add Cycle';
  @ViewChild('confirm') public confirm: Confirm;
  headerIndex = '';
  allowAdd: boolean = false;
  addRecipeForm: FormGroup;

  constructor(
    public apiService: ApiService,
    private router: Router,
    private _location: Location,
    private _formBuilder: FormBuilder,
    private sharedService: SharedService,
    private media: MediaObserver
  ) {}

  ngOnInit() {
    console.log(this.recipee_details);
    console.log(this.runTimeDetails);
  }

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }

  getDetails() {
    this.subscription = this.apiService.detailsSubject.subscribe((res: any) => {
      this.details = res;

      console.log(this.details);
      if (this.details == 0) {
        // this._location.back();
      } else {
        this.details.details.details = this.details.details.details.map((val: Object) => {
          val['isEdit'] = true;
          this.button_text_recipe = val['isEdit'] ? 'Save' : 'Edit Recipe';
          return val;
        });
        this.details.details.run_times = this.details.details.run_times.map((val: Object) => {
          val['isEdit'] = true;
          this.button_text_runtimes = val['isEdit'] ? 'Save' : 'Edit Routine';
          return val;
        });
      }
    });
  }

  isEmptyObject(obj: any) {
    return obj && Object.keys(obj).length === 0;
  }

  addCycle() {
    this.sharedService.sharedServiceData.next(this.recipee_details);
    this.router.navigate([
      `/component1/add-recipe/${this.recipee_details.id}`,
      { outlets: { RECIPE_CYCLE_MODAL: ['add-new', 'Add New'] } },
    ]);
  }

  delete(data: any) {
    var arrToMake: any;
    var arrayToPush: any = {
      id: '',
      data: [],
    };
    this.confirm.show(`Are you sure you want to delete?`).then((opt) => {
      if (opt == true) {
        this.apiService.getRecipe_detail_name(this.recipee_details.id).subscribe((res: any) => {
          arrToMake = res.data;
          var index = arrToMake
            .map((x: any) => {
              return x.id;
            })
            .indexOf(data.id);
          arrToMake.splice(index, 1);
          arrayToPush.id = this.recipee_details.id;
          arrayToPush.data = arrToMake;
          this.apiService.addRecipe_detail_name(arrayToPush).subscribe((res: any) => {
            this.apiService.actionSubject.next(1);
          });
        });
      }
    });
  }

  editCycle(data: any) {
    let obj: any = {
      id: this.recipee_details.id,
      data: data,
    };
    this.sharedService.sharedServiceData.next(obj);
    this.router.navigate([
      `/component1/add-recipe/${this.recipee_details.id}`,
      { outlets: { RECIPE_CYCLE_MODAL: ['add-new', 'Edit'] } },
    ]);
  }

  editRoutine(data: any) {
    let obj: any = {
      id: this.runTimeDetails,
      data: data,
    };
    this.sharedService.sharedServiceData.next(obj);
    this.router.navigate([
      `/component1/add-recipe/${this.runTimeDetails.id}`,
      { outlets: { RECIPE_RUNTIME_MODAL: ['add-run-time', 'Edit'] } },
    ]);
  }

  addRoutine() {
    this.sharedService.sharedServiceData.next(this.runTimeDetails);
    this.router.navigate([
      `/component1/add-recipe/${this.runTimeDetails.id}`,
      { outlets: { RECIPE_RUNTIME_MODAL: ['add-run-time', 'Add New'] } },
    ]);
  }

  deleteRoutine(data: any) {
    var arrToMake: any;
    var arrayToPush: any = {
      id: '',
      data: [],
    };
    this.confirm.show(`Are you sure you want to delete?`).then((opt) => {
      if (opt == true) {
        this.apiService.getRecipe_detail_run_time(this.runTimeDetails.id).subscribe((res: any) => {
          console.log(res);
          arrToMake = res.data;
          var index = arrToMake
            .map((x: any) => {
              return x.id;
            })
            .indexOf(data.id);
          arrToMake.splice(index, 1);
          arrayToPush.id = this.runTimeDetails.id;
          arrayToPush.data = arrToMake;
          this.apiService.addRecipe_detail_run_time(arrayToPush).subscribe((res: any) => {
            this.apiService.actionSubject.next(1);
          });
        });
      }
    });
  }
}
