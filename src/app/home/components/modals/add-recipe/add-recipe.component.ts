import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ApiService } from '@app/@shared/apiService/api.service';
import { SharedService } from '@app/@shared/services/shared.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-recipe-modal',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss'],
})
export class AddRecipeModalComponent implements OnInit {
  _form!: FormGroup;
  error: any;
  isLoading: boolean = false;
  fileData: File = null;
  selected: any = '';
  type: any = 'Add New';
  subscription: Subscription;
  details: any;
  @Output() onPage = new EventEmitter();
  todayDate: Date = new Date();

  public model = {
    id: 1,
    name: '',
    description: '',
    total_days: '',
    last_updated: '',
    next_sched: '',
    status: true,
    details: [
      {
        id: 1,
        days: '',
        cycle: '',
        stage: '',
        grow_A: '',
        grow_B: '',
        bloom_A: '',
        bloom_B: '',
        bloom_C: '',
        e_plus: '',
        targets: [
          {
            ph: '0',
            ec: '0',
            tds: '0',
          },
        ],
        isEdit: false,
      },
    ],
    run_times: [
      {
        id: 1,
        start_time: '',
        end_time: '',
        total_duration: '0Hr 0Min',
        output: '',
        select_days: [
          {
            id: 1,
            day: 'Sun',
            bool: false,
          },
          {
            id: 2,
            day: 'M',
            bool: false,
          },
          {
            id: 3,
            day: 'Tu',
            bool: false,
          },
          {
            id: 4,
            day: 'W',
            bool: false,
          },
          {
            id: 5,
            day: 'Th',
            bool: false,
          },
          {
            id: 6,
            day: 'F',
            bool: false,
          },
          {
            id: 7,
            day: 'Sat',
            bool: false,
          },
        ],
        isEdit: false,
      },
    ],
  };

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

  ngOnInit(): void {}

  private createForm() {
    this._form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      total_days: ['', Validators.required],
      // date: ['', Validators.required],
    });
  }

  async addGrowthPlan() {
    let _recipeGrowthData = await this.apiService.getRecipeGrowthPlan().toPromise();
    this.model.id = _recipeGrowthData['data'].length + 1;
    this.model.name = this._form.value.name;
    this.model.description = this._form.value.description;
    this.model.total_days = this._form.value.total_days;
    let _todayDate = new Date();
    this.model.last_updated = _todayDate.toLocaleString();
    this.model.next_sched = new Date(_todayDate.setDate(_todayDate.getDate() + 2)).toLocaleString();
    _recipeGrowthData['data'].push(this.model);
    this.isLoading = true;
    this.apiService.editRecipe(_recipeGrowthData).subscribe((resp) => {
      this.isLoading = false;
      this._location.back();
    });
  }

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

  add() {}

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
