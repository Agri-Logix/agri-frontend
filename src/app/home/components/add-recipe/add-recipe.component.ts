import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/@shared/apiService/api.service';
import { debounce } from 'lodash';
import { Pumps } from '@shared/components/models/pumps';
@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss'],
})
export class AddRecipeComponent implements OnInit {
  data: any;
  isEditing: boolean = false;
  button_pumps = 'Save Pumps';
  debouncedFunction: any;
  params: any;
  recipee_details: any;
  run_time_details: any;
  pumpsModel: Pumps;
  receipGrowthData: any;
  constructor(private _router: ActivatedRoute, public apiService: ApiService) {
    this._router.params.subscribe((params) => {
      this.params = params;
      this.getRecipeGrowthPlan();
    });
  }

  getUpdatedData() {
    this.apiService.actionSubject.subscribe((res: any) => {
      if (res == 1) {
        this.getRecipeDetailName(this.params.id);
        this.getRecipe_detail_run_time(this.params.id);
      }
    });
  }

  getRecipeGrowthPlan() {
    this.apiService.getRecipeeGrowthPlanData().subscribe((res: any) => {
      this.receipGrowthData = res;
      this.getRecipeDetailPumps(this.params.id);
      this.getRecipeDetailName(this.params.id);
      this.getRecipe_detail_run_time(this.params.id);
    });
  }

  getRecipeDetailPumps(id: any) {
    this.apiService.getRecipe_detail_pumps(id).subscribe(
      (res: any) => {
        this.data = res;
      },
      (error: any) => {
        this.pumpsModel = new Pumps();
        this.data = {
          id: this.receipGrowthData.slice(-1)[0].id,
          pumps: this.pumpsModel.pumps,
        };
      }
    );
  }

  getRecipeDetailName(id: any) {
    this.apiService.getRecipe_detail_name(id).subscribe(
      (res: any) => {
        this.recipee_details = res;
        let find = this.receipGrowthData.find((x: any) => x.id == id);
        this.recipee_details.name = find.name;
      },
      (err: any) => {
        this.recipee_details = {
          id: id,
          data: [],
        };
        let find = this.receipGrowthData.find((x: any) => x.id == id);
        this.recipee_details.name = find.name;
        // this.recipee_details.data.targets = {
        //   ph: '',
        //   ec: '',
        //   tds: '',
        // };
      }
    );
  }

  getRecipe_detail_run_time(id: any) {
    this.apiService.getRecipe_detail_run_time(id).subscribe(
      (res: any) => {
        this.run_time_details = res;
        console.log(this.run_time_details);
      },
      (err: any) => {
        this.run_time_details = {
          id: id,
          data: [],
        };
      }
    );
  }
  editable_row() {
    if (!this.isEditing) {
      this.isEditing = true;
      this.data.pumps = this.data.pumps.map((item: any) => {
        item['isEdit'] = this.isEditing;
        return item;
      });
    } else {
      this.isEditing = false;
      this.data.pumps = this.data.pumps.map((item: any) => {
        item['isEdit'] = this.isEditing;
        console.log(this.data.pumps);
        setTimeout(() => {
          this.updateRecipe_detail_pumps();
        }, 2000);
        return item;
      });
    }
  }

  updateRecipe_detail_pumps() {
    this.data.id = this.params.id;
    this.apiService.updateRecipe_detail_pumps(this.data).subscribe(
      (res: any) => {
        this.getRecipeDetailPumps(this.data.id);
      },
      (error: any) => {
        console.log('@@@@@@');
        this.data.id = this.receipGrowthData.slice(-1)[0].id;
        this.apiService.addOrCreateRecipe_detail_pumps(this.data).subscribe((res: any) => {
          this.getRecipeDetailPumps(this.data.id);
        });
      }
    );
  }

  async edit_row(index: number, newValue: number) {
    if (this.debouncedFunction) {
      this.debouncedFunction.cancel();
    }
    this.debouncedFunction = debounce(async () => {
      this.data.pumps[index].name = newValue;
    }, 1000);
    this.debouncedFunction();
  }
  ngOnInit(): void {
    this.getUpdatedData();
  }
}
