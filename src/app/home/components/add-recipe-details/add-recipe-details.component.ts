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
  constructor(public apiService: ApiService, private _location: Location) {}

  async ngOnInit() {
    this.getDetails();
  }

  editableRow(index: number) {
    console.log(this.details.details.details[index]);
    this.details.details.details[index].isEdit = !this.details.details.details[index].isEdit;
  }

  editRow(newValue: string | number, keyName: string, rowData: Object, subValue?: string) {
    console.log(this.debouncedFunction);
    this.debouncedFunction = debounce(async () => {
      let apiResponse = (await this.apiService.getRecipeGrowthPlan().toPromise()) as Object;
      let headerIndex = new URLSearchParams(window.location.search).get('data');

      console.log(apiResponse);
      console.log(headerIndex);
      let updateModel = apiResponse['data'].find((x: any) => x.id === parseInt(headerIndex));
      let index_of_rowData = updateModel['details'].indexOf(
        updateModel['details'].find((x: any) => x.id === rowData['id'])
      );
      if (subValue) {
        rowData[keyName][0][subValue] = newValue;
      } else {
        rowData[keyName] = newValue;
      }
      apiResponse['data'][apiResponse['data'].indexOf(updateModel)]['details'][index_of_rowData] = rowData;
      this.apiService.editRecipe(apiResponse).subscribe((resp) => {
        console.log(resp);
        this.editableRow(rowData['id']);
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
          val['isEdit'] = false;
          return val;
        });
      }
    });
  }
}
