import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@app/@shared/apiService/api.service';
import { Observable } from 'rxjs';
import { Confirm } from '@app/@shared/components/confirm';

@Component({
  selector: 'app-growth-paln',
  templateUrl: './growth-paln.component.html',
  styleUrls: ['./growth-paln.component.scss'],
})
export class GrowthPalnComponent implements OnInit {
  @Input('recipeGrowthData') recipeGrowthData: Observable<any>;
  @ViewChild('confirm') public confirm: Confirm;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    console.log(this.recipeGrowthData);
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
