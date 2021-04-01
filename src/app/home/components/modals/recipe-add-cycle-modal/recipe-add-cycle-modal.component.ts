import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ApiService } from '@app/@shared/apiService/api.service';
import { SharedService } from '@app/@shared/services/shared.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-recipe-add-cycle-modal',
  templateUrl: './recipe-add-cycle-modal.component.html',
  styleUrls: ['./recipe-add-cycle-modal.component.scss'],
})
export class RecipeAddCycleModalComponent implements OnInit {
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
  receipGrowthData: any;

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
    this.createForm();
  }

  ngOnInit(): void {
    this.getRecipeGrowthPlan();
    this.getDetails();
  }

  private createForm() {
    this.Form = this.formBuilder.group({
      cycle: [''],
      stage: [''],
      grow_A: [''],
      grow_B: [''],
      bloom_A: [''],
      bloom_B: [''],
      e_plus: [''],
      targets: this.formBuilder.group({
        ph: [''],
        ec: [''],
        tds: [''],
      }),
      // date: ['', Validators.required],
    });
  }

  getSelectionChange() {}

  getDetails() {
    this.subscription = this.sharedService.sharedServiceData.subscribe(async (res: any) => {
      this.details = res;
      console.log(this.details);

      if (this.details == 0 && !this.details == null) {
        this._location.back();
      } else if (this.details != null && !this.details.data.length) {
        this.Form.patchValue({
          cycle: this.details.data.cycle,
          stage: this.details.data.stage,
          grow_A: this.details.data.grow_A,
          grow_B: this.details.data.grow_B,
          bloom_A: this.details.data.bloom_A,
          bloom_B: this.details.data.bloom_B,
          e_plus: this.details.data.e_plus,
          targets: {
            ph: this.details.data.targets.ph ? this.details.data.targets.ph : '',
            ec: this.details.data.targets.ec ? this.details.data.targets.ec : '',
            tds: this.details.data.targets.tds ? this.details.data.targets.tds : '',
          },
        });
      }
    });
  }

  getRecipeGrowthPlan() {
    this.apiService.getRecipeeGrowthPlanData().subscribe((res: any) => {
      this.receipGrowthData = res;
      console.log(this.receipGrowthData.slice(-1)[0]);
    });
  }
  add() {
    this.isLoading = true;
    this.Form.value.id = this.details.id;
    var arrToMake: any;
    var arrayToPush: any = {
      id: '',
      data: [],
    };
    let arr: any = this.Form.value;
    this.apiService.getRecipe_detail_name(this.Form.value.id).subscribe(
      (res: any) => {
        arrToMake = res.data;
        arr.id = res.data.length ? res.data.slice(-1)[0].id + 1 : 0;
        arrToMake.push(arr);
        arrayToPush.id = this.details.id;
        arrayToPush.data = arrToMake;
        this.apiService.addRecipe_detail_name(arrayToPush).subscribe((res: any) => {
          this._location.back();
          this.apiService.actionSubject.next(1);
          this.isLoading = false;
        });
        this.isLoading = false;
      },
      (error: any) => {
        arrToMake = [];
        arr.id = this.receipGrowthData.slice(-1)[0].id + 1;
        arrToMake.push(arr);
        arrayToPush.id = this.details.id;
        arrayToPush.data = arrToMake;
        this.apiService.createOrAddRecipe_detail_name(arrayToPush).subscribe((res: any) => {
          this._location.back();
          this.apiService.actionSubject.next(1);
          this.isLoading = false;
        });
      }
    );
  }

  update() {
    this.isLoading = true;
    this.Form.value.id = this.details.id;
    var arrToMake: any;
    var arrayToPush: any = {
      id: '',
      data: [],
    };
    let arr: any = this.Form.value;
    this.apiService.getRecipe_detail_name(this.details.id).subscribe((res: any) => {
      arrToMake = res.data;
      arr.id = this.details.data.id;
      var index = arrToMake
        .map((x: any) => {
          return x.id;
        })
        .indexOf(this.Form.value.id);
      arrToMake.splice(index, 1);
      arrToMake.push(arr);
      arrayToPush.id = this.details.id;
      arrayToPush.data = arrToMake;
      this.apiService.addRecipe_detail_name(arrayToPush).subscribe((res: any) => {
        this.apiService.actionSubject.next(1);
        this._location.back();
        let data = {
          id: this.details.id,
          last_updated: new Date(),
        };
        this.apiService.updateRecipeeGrowthPlanData(data).subscribe((res: any) => {
          console.log(res);
        });
        this.isLoading = false;
      });
      this.isLoading = false;
    });
  }

  close() {
    this.modalService.dismissAll();
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
    this.sharedService.sharedServiceData.next(null);
  }
}
