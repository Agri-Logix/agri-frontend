import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ApiService } from '@app/@shared/apiService/api.service';
import { SharedService } from '@app/@shared/services/shared.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
const RADIO_LIST = [
  { name: 'M', checked: false },
  { name: 'Tu', checked: false },
  { name: 'W', checked: true },
  { name: 'Th', checked: false },
  { name: 'F', checked: false },
  { name: 'Sat', checked: false },
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
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public modalService: NgbModal,
    private _location: Location,
    private apiService: ApiService,
    private sharedService: SharedService
  ) {
    this.days = RADIO_LIST;
    this.route.params.subscribe((params) => {
      this.type = params['type'];
    });
    this.createForm();
    this._patchValues();
  }

  ngOnInit(): void {}

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
      formArray.push(
        new FormGroup({
          checked: new FormControl(data.checked),
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
      } else if (this.details) {
      }
    });
  }

  add() {
    this.isLoading = true;
    console.log(this.Form.value);
    // const selectedCheckedValues = this.Form.value.days.filter(
    //   (f: any) => f.checked
    // );
    // console.log('selected form values : ', selectedCheckedValues);

    this.isLoading = false;
  }

  update() {
    this.isLoading = true;
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
