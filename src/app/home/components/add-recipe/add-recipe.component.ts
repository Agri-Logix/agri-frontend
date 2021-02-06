import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/@shared/apiService/api.service';
import { debounce } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss'],
})
export class AddRecipeComponent implements OnInit {
  data: any;
  button_pumps = 'Edit';
  debouncedFunction: any;
  recipePumps: any;
  headerIndex = Number(new URLSearchParams(window.location.search).get('data'));

  constructor(private _router: ActivatedRoute, public apiService: ApiService) {}

  editable_row() {
    console.table(this.data);
    this.recipePumps = this.recipePumps.map((item: any) => {
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
      let recipee = await this.apiService.getRecipePumps(this.headerIndex).toPromise();
      console.group(recipee, newValue, index);
      recipee['pumps'][index].name = newValue;
      console.group(recipee, newValue, index);
      this.apiService.editRecipePumps(this.headerIndex, recipee).subscribe((resp) => {
        this.initPumps();
      });
    }, 1000);
    this.debouncedFunction();
  }

  ngOnInit(): void {
    this.initPumps();
  }

  private initPumps() {
    this.apiService
      .getRecipePumps(this.headerIndex)
      .pipe(
        map((data: any) => {
          data = data.pumps.map((item: any) => {
            item['isEdit'] = false;
            return item;
          });
          return data;
        })
      )
      .subscribe((resp) => {
        this.recipePumps = resp;
      });
  }
}
