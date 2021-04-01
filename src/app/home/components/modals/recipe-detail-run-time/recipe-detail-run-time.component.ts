import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ApiService } from '@app/@shared/apiService/api.service';
import { SharedService } from '@app/@shared/services/shared.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
const select_days = [
  { id: 1, day: 'Sun', bool: false },
  { id: 2, day: 'M', bool: false },
  { id: 3, day: 'Tu', bool: false },
  { id: 4, day: 'W', bool: false },
  { id: 5, day: 'Th', bool: false },
  { id: 6, day: 'F', bool: false },
  { id: 7, day: 'Sat', bool: false },
];
@Component({
  selector: 'app-recipe-detail-run-time',
  templateUrl: './recipe-detail-run-time.component.html',
  styleUrls: ['./recipe-detail-run-time.component.scss'],
})
export class RecipeDetailRunTimeComponent implements OnInit {
  Form!: FormGroup;
  error: any;
  isLoading: boolean = false;
  fileData: File = null;
  selected: any = '';
  type: any = 'Add New';
  subscription: Subscription;
  details: any;
  @Output() onPage = new EventEmitter();
  todayDate: Date = new Date();
  days: any = [];
  receipRunTimeData: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public modalService: NgbModal,
    private _location: Location,
    private apiService: ApiService,
    private sharedService: SharedService
  ) {
    this.route.params.subscribe((params) => {
      this.type = params['type'];
    });
    this.days = this.type !== 'Edit' ? (this.days = select_days) : '';
    this.createForm();
    this.type !== 'Edit' ? this._patchValues() : '';
  }

  ngOnInit(): void {
    this.getRecipeGrowthPlan();
    this.getDetails();
  }

  private createForm() {
    this.Form = this.formBuilder.group({
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      days: new FormArray([]),
      // date: ['', Validators.required],
    });
  }

  private _patchValues() {
    // get array control
    const formArray = this.Form.get('days') as FormArray;
    // loop each existing value
    this.days.forEach((data: any) => {
      console.log(data);
      formArray.push(
        new FormGroup({
          bool: new FormControl(data.bool),
          id: new FormControl(data.id),
          day: new FormControl(data.day),
        })
      );
    });
  }

  getSelectionChange() {}

  getDetails() {
    this.subscription = this.sharedService.sharedServiceData.subscribe(async (res: any) => {
      this.details = res;
      console.log(this.details);

      if (this.details == 0) {
        this._location.back();
      } else if (this.details != null && !this.details.data.length && Object.keys(this.details.data).length > 0) {
        this.Form.patchValue({
          start_time: this.details.data.start_time ? this.details.data.start_time : '',
          end_time: this.details.data.end_time ? this.details.data.end_time : '',
        });
        this.days = this.details.data.select_days ? this.details.data.select_days : select_days;
        this._patchValues();
      }
    });
  }

  calculateTimeDifference(start: any, end: any) {}

  getRecipeGrowthPlan() {
    this.apiService.getRecipeeGrowthPlanData().subscribe((res: any) => {
      this.receipRunTimeData = res;
      console.log(this.receipRunTimeData.slice(-1)[0]);
    });
  }

  add() {
    this.isLoading = true;
    var duration = moment.duration(moment(this.Form.value.end_time).diff(this.Form.value.start_time));
    this.Form.value.id = this.details.id;
    var arrToMake: any = [];
    var arrayToPush: any = {
      id: '',
      data: [],
    };
    let arr: any = {
      start_time: this.Form.value.start_time,
      end_time: this.Form.value.end_time,
      total_duration: {
        h: Math.floor(duration.asHours()),
        m: Math.floor(duration.asMinutes()),
        s: Math.floor(duration.asSeconds()),
      },
      select_days: this.Form.value.days,
    };
    arrToMake = this.details.data.length ? this.details.data : [];
    console.log(arrToMake);
    arr.id = this.details.data.length ? this.details.data.slice(-1)[0].id + 1 : 0;
    arrToMake.push(arr);
    arrayToPush.id = this.details.id;
    arrayToPush.data = arrToMake;
    this.apiService.addRecipe_detail_run_time(arrayToPush).subscribe(
      (res: any) => {
        this._location.back();
        this.apiService.actionSubject.next(1);
        this.isLoading = false;
      },
      (error: any) => {
        var duration = moment.duration(moment(this.Form.value.end_time).diff(this.Form.value.start_time));
        var arrayToPush: any = {
          id: '',
          data: [],
        };
        let arr: any = {
          id: 1,
          start_time: this.Form.value.start_time,
          end_time: this.Form.value.end_time,
          total_duration: {
            h: Math.floor(duration.asHours()),
            m: Math.floor(duration.asMinutes()),
            s: Math.floor(duration.asSeconds()),
          },
          select_days: this.Form.value.days,
        };
        arrayToPush.id = this.receipRunTimeData.slice(-1)[0].id;
        arrayToPush.data.push(arr);
        console.log(arrayToPush);
        this.apiService.createOrAddRecipe_detail_run_time(arrayToPush).subscribe(
          (res: any) => {
            this._location.back();
            this.apiService.actionSubject.next(1);
            this.isLoading = false;
          },
          (error: any) => {
            this.isLoading = false;
          }
        );
        console.log(arrayToPush);
      }
    );
  }

  update() {
    this.isLoading = true;
    var duration = moment.duration(moment(this.Form.value.end_time).diff(this.Form.value.start_time));
    this.Form.value.id = this.details.data.id;
    var arrToMake: any;
    var arrayToPush: any = {
      id: '',
      data: [],
    };
    let arr: any = {
      start_time: this.Form.value.start_time,
      end_time: this.Form.value.end_time,
      total_duration: {
        h: Math.floor(duration.asHours()),
        m: Math.floor(duration.asMinutes()),
        s: Math.floor(duration.asSeconds()),
      },
      select_days: this.Form.value.days,
    };
    arrToMake = this.details.id.data;
    arr.id = this.details.data.id;
    var index = arrToMake
      .map((x: any) => {
        return x.id;
      })
      .indexOf(this.Form.value.id);
    arrToMake.splice(index, 1);
    arrToMake.push(arr);
    arrayToPush.id = this.details.id.id;
    arrayToPush.data = arrToMake;
    this.apiService.addRecipe_detail_run_time(arrayToPush).subscribe((res: any) => {
      this._location.back();
      this.apiService.actionSubject.next(1);
      let data = {
        id: this.details.id.id,
        last_updated: new Date(),
      };
      this.apiService.updateRecipeeGrowthPlanData(data).subscribe((res: any) => {
        console.log(res);
      });
      this.isLoading = false;
    });
    this.isLoading = false;
  }

  close() {
    this.modalService.dismissAll();
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
    this.sharedService.sharedServiceData.next(null);
  }
}
