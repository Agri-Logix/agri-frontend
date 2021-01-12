import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '@app/@shared/apiService/api.service';
import { Observable, Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { map } from 'rxjs/operators';
import { debounce } from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';

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
  button_text = 'Edit Recipe';
  headerIndex = '';
  constructor(public apiService: ApiService, private _location: Location) {}

  async ngOnInit() {
    this.getDetails();
    this.headerIndex = new URLSearchParams(window.location.search).get('data');
  }

  editableRow(key: string) {
    this.details.details[key] = this.details.details[key].map((x: any) => {
      x.isEdit = !x.isEdit;
      this.button_text = x.isEdit ? 'Save' : 'Edit Recipe';
      return x;
    });

    this.details.details.run_times = this.details.details.run_times.map((val: any) => {
      val.isEdit = !val.isEdit;
      return val;
    });

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
          this.button_text = val['isEdit'] ? 'Save' : 'Edit Recipe';
          return val;
        });
        this.details.details.run_times = this.details.details.run_times.map((val: Object) => {
          val['isEdit'] = true;
          this.button_text = val['isEdit'] ? 'Save' : 'Edit Recipe';
          return val;
        });
        console.log(this.details.details.run_times);
      }
    });
  }
}
