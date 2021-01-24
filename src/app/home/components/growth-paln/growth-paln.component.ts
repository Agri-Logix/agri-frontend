import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@app/@shared/apiService/api.service';
import { Observable } from 'rxjs';
import { Confirm } from '@app/@shared/components/confirm';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-growth-paln',
  templateUrl: './growth-paln.component.html',
  styleUrls: ['./growth-paln.component.scss'],
})
export class GrowthPalnComponent implements OnInit {
  @Input('recipeGrowthData') recipeGrowthData: Observable<any>;
  @ViewChild('confirm') public confirm: Confirm;
  _form: FormGroup;
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

  allowAdd: boolean = false;
  constructor(private apiService: ApiService, private router: Router, private _fb: FormBuilder) {}

  ngOnInit(): void {
    this._form = this._fb.group({
      name: [''],
      desc: [''],
      total_days: [''],
    });
  }

  edit(headers: any, element: any) {
    let data: any = {
      pumpsData: headers,
      details: element,
    };
    this.apiService.detailsSubject.next(data);

    this.router.navigate(['/component1/add-recipe/'], {
      queryParams: { data: element.id },
    });
  }

  async addGrowthPlan() {
    let _recipeGrowthData = await this.recipeGrowthData.toPromise();
    this.model.id = _recipeGrowthData['data'].length + 1;
    this.model.name = this._form.value.name;
    this.model.description = this._form.value.desc;
    this.model.total_days = this._form.value.total_days;
    let _todayDate = new Date();
    this.model.last_updated = _todayDate.toLocaleString();
    this.model.next_sched = new Date(_todayDate.setDate(_todayDate.getDate() + 2)).toLocaleString();
    _recipeGrowthData['data'].push(this.model);
    this.apiService.editRecipe(_recipeGrowthData).subscribe((resp) => {
      this.isAdd(false);
    });
  }

  isAdd(checkInput: boolean) {
    this.allowAdd = checkInput;
  }

  async delete(id: number) {
    let recipeGrowthData_resp = await this.recipeGrowthData.toPromise();
    recipeGrowthData_resp.data.splice(id, 1);
    this.confirm.show(`Are you sure you want to delete?`).then((opt) => {
      if (opt == true) {
        this.apiService.editRecipe(recipeGrowthData_resp).subscribe((res: any) => {
          this.apiService.actionSubject.next(1);
        });
      }
    });
    console.log(recipeGrowthData_resp);
  }
}
