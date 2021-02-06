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
  recipeGrowthData: Observable<any>;
  @ViewChild('confirm') public confirm: Confirm;
  _form: FormGroup;

  allowAdd: boolean = false;
  constructor(private apiService: ApiService, private router: Router, private _fb: FormBuilder) {
    this.recipeGrowthData = this.apiService.getRecipeGrowthPlan();
  }

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

  isAdd(checkInput: boolean) {
    this.addRecipe();
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

  addRecipe() {
    this.router.navigate(['/component1/', { outlets: { RECIPE_MODAL: ['add-new', 'Add New'] } }]);
  }
}
