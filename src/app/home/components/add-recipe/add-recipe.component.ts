import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/@shared/apiService/api.service';
import { debounce } from 'lodash';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss'],
})
export class AddRecipeComponent implements OnInit {
  data: any;
  button_pumps = 'Save Pumps';
  debouncedFunction: any;

  constructor(private _router: ActivatedRoute, public apiService: ApiService) {
    // this._router.queryParams.subscribe((params) => {
    //   console.log(params);
    // });
  }

  editable_row() {
    this.data.pumpsData.pumps = this.data.pumpsData.pumps.map((item: any) => {
      item['isEdit'] = !item['isEdit'];
      console.log(item);
      item.isEdit ? (this.button_pumps = 'Save Pumps') : (this.button_pumps = 'Edit');
      return item;
    });
  }

  async edit_row(index: number, newValue: number) {
    if (this.debouncedFunction) {
      this.debouncedFunction.cancel();
    }
    this.debouncedFunction = debounce(async () => {
      let recipee = await this.apiService.getRecipeGrowthPlan().toPromise();
      this.data.pumpsData.pumps[index].name = newValue;
      recipee.pumps = this.data.pumpsData.pumps;
      this.apiService.editRecipe(recipee).subscribe((resp) => {
        console.log('done');
      });
    }, 1000);
    this.debouncedFunction();
  }
  ngOnInit(): void {
    this.apiService.detailsSubject.subscribe((resp) => {
      this.data = resp;
      let headerIndex = new URLSearchParams(window.location.search).get('data');
      this.data.pumpsData.pumps = this.data.pumpsData.pumps.map((item: any) => {
        item['isEdit'] = headerIndex ? true : false;
        return item;
      });
    });
  }
}
