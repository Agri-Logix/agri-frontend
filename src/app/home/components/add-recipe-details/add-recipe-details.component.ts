import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '@app/@shared/apiService/api.service';
import { Observable, Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { debounce } from 'lodash';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './add-recipe-details.component.html',
  styleUrls: ['./add-recipe-details.component.scss'],
})
export class AddRecipeDetailsComponent implements OnInit {
  @Input('details') data: Observable<any>;
  subscription: Subscription;
  debouncedFunction: any;
  details: any;
  button_text_recipe = 'Edit Recipe';
  button_text_runtimes = 'Edit Routine';
  button_text_addRecipe = 'Add Cycle';
  headerIndex = '';
  allowAdd: boolean = false;
  addRecipeForm: FormGroup;

  constructor(public apiService: ApiService, private _location: Location, private _formBuilder: FormBuilder) {
    this.createRecipeForm();
  }
  createRecipeForm() {
    this.addRecipeForm = this._formBuilder.group({
      days: [''],
      stage: [''],
      grow_A: [''],
      grow_B: [''],
      bloom_A: [''],
      bloom_B: [''],
      bloom_C: [''],
      e_plus: [''],
      ph: ['0'],
      ec: ['0'],
      tds: ['0'],
    });
  }

  async ngOnInit() {
    this.getDetails();
    this.headerIndex = new URLSearchParams(window.location.search).get('data');
  }

  isAdd() {
    this.allowAdd = !this.allowAdd;
    this.button_text_addRecipe = this.allowAdd ? 'Cancel' : 'Add Cycle';
    this.button_text_recipe = this.allowAdd ? 'Save' : 'Edit Recipe';
  }

  async addRecipe() {
    let apiResponse = (await this.apiService.getRecipeGrowthPlan().toPromise()) as Object;
    let headerIndex = new URLSearchParams(window.location.search).get('data');
    let updateModel = apiResponse['data'].find((x: any) => x.id === parseInt(headerIndex));
    this.addRecipeForm.value['id'] = updateModel['details'].length + 1;
    this.addRecipeForm.value['targets'] = [
      {
        ph: this.addRecipeForm.value['ph'],
        ec: this.addRecipeForm.value['ec'],
        tds: this.addRecipeForm.value['tds'],
      },
    ];
    delete this.addRecipeForm.value['ph'];
    delete this.addRecipeForm.value['ec'];
    delete this.addRecipeForm.value['tds'];
    updateModel['details'].push(this.addRecipeForm.value);
    this.apiService.editRecipe(apiResponse).subscribe((resp) => {
      this.allowAdd = false;
      this.getDetails();
    });
  }

  editableRow(key: string) {
    if (!this.allowAdd) {
      if (key == 'details') {
        this.details.details[key] = this.details.details[key].map((x: any) => {
          x.isEdit = !x.isEdit;
          this.button_text_recipe = x.isEdit ? 'Save' : 'Edit Recipe';
          return x;
        });
      } else {
        this.details.details.run_times = this.details.details.run_times.map((val: any) => {
          val.isEdit = !val.isEdit;
          this.button_text_runtimes = val['isEdit'] ? 'Save' : 'Edit Routine';
          return val;
        });
      }
    } else {
      this.addRecipe();
    }
    // this.details.details.run_times = this.details.details.run_times.map((val: any) => {
    //   val.isEdit = !val.isEdit;
    //   //
    //   return val;
    // });

    // [index].isEdit = !this.details.details[key][index].isEdit;
  }

  editRow(newValue: any, keyName: string, rowData: Object, objectName: string, subValue?: string, subIndex?: number) {
    console.log(this.debouncedFunction);
    if (this.debouncedFunction) {
      this.debouncedFunction.cancel();
    }
    this.debouncedFunction = debounce(async () => {
      let apiResponse = (await this.apiService.getRecipeGrowthPlan().toPromise()) as Object;
      let headerIndex = new URLSearchParams(window.location.search).get('data');
      let updateModel = apiResponse['data'].find((x: any) => x.id === parseInt(headerIndex));
      let index_of_rowData = updateModel[objectName].indexOf(
        updateModel[objectName].find((x: any) => x.id === rowData['id'])
      );
      if (subValue) {
        rowData[keyName][subIndex][subValue] = newValue;
      } else {
        rowData[keyName] = newValue;
      }
      apiResponse['data'][apiResponse['data'].indexOf(updateModel)][objectName][index_of_rowData] = rowData;
      this.apiService.editRecipe(apiResponse).subscribe((resp) => {
        // if (typeof newValue !== 'boolean') {
        //   this.editableRow(index_of_rowData, objectName);
        // }
      });
    }, 1000);
    this.debouncedFunction();
  }

  getDetails() {
    this.subscription = this.apiService.detailsSubject.subscribe(async (res: any) => {
      this.details = res;

      console.log(this.details);
      if (this.details == 0) {
        this._location.back();
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
}
