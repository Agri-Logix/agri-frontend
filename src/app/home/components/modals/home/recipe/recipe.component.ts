import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ApiService } from '@app/@shared/apiService/api.service';
import { SharedService } from '@app/@shared/services/shared.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit {
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
    this.getDetails();
  }

  private createForm() {
    this.Form = this.formBuilder.group({
      cycle: [''],
      stage: [''],
      sun_rise_min: [''],
      sun_set_min: [''],
      auto_dim_temp: [''],
      auto_shutoff_temp: [''],
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

      if (this.details == 0) {
        this.close();
      } else if (this.details.type == 'edit') {
        this.Form.patchValue({
          cycle: this.details.rowData.cycle,
          stage: this.details.rowData.stage,
          sun_rise_min: this.details.rowData.sun_rise_min,
          sun_set_min: this.details.rowData.sun_set_min,
          auto_dim_temp: this.details.rowData.auto_dim_temp,
          auto_shutoff_temp: this.details.rowData.auto_shutoff_temp,
          targets: {
            ph: this.details.rowData.targets.ph ? this.details.rowData.targets.ph : '',
            ec: this.details.rowData.targets.ec ? this.details.rowData.targets.ec : '',
            tds: this.details.rowData.targets.tds ? this.details.rowData.targets.tds : '',
          },
        });
      }
    });
  }

  getRecipeGrowthPlan() {
    this.apiService.getRecipeeGrowthPlanData().subscribe((res: any) => {
      this.receipGrowthData = res;
    });
  }
  add() {
    this.isLoading = true;
    this.Form.value.id = this.details.data.data.length ? this.details.data.data.slice(-1)[0].id + 1 : 1;

    var obj = {
      id: this.details.data.id,
      name: this.details.data.name,
      data: [...this.details.data.data, this.Form.value],
    };

    // id type is to edit, delete the row from array and add an updated one
    if (this.details.type == 'edit') {
      var index = this.details.data.data
        .map((x: any) => {
          return x.id;
        })
        .indexOf(this.details.rowData.id);
      obj.data.splice(index, 1);
    }
    this.addOrUpdate(obj);
  }

  addOrUpdate(data: any) {
    console.log(data);
    this.apiService.putRecipe_detail_lights_name(data).subscribe(
      (res: any) => {
        this.close();
        this.apiService.actionSubject.next(2);
        this.isLoading = false;
      },
      (error: any) => {
        this.isLoading = false;
      }
    );
  }

  close() {
    this.modalService.dismissAll();
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
    this.sharedService.sharedServiceData.next(0);
  }
}
