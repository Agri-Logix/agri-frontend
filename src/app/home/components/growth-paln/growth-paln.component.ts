import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@app/@shared/apiService/api.service';
import { Observable } from 'rxjs';
import { Confirm } from '@app/@shared/components/confirm';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedService } from '@app/@shared/services/shared.service';
import { MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-growth-paln',
  templateUrl: './growth-paln.component.html',
  styleUrls: ['./growth-paln.component.scss'],
})
export class GrowthPalnComponent implements OnInit {
  @Input('recipeGrowthData') recipeGrowthData: Observable<any>;
  @ViewChild('confirm') public confirm: Confirm;
  _form: FormGroup;

  allowAdd: boolean = false;
  recipeDetailPumps: any;
  recipee_details: any;
  run_time_details: any;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private _fb: FormBuilder,
    private sharedService: SharedService,
    private media: MediaObserver
  ) {}

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }

  ngOnInit(): void {
    // this.getRecipeDetailPumps(1);
    // this.getRecipeDetailName(1);
    // this.getRecipe_detail_run_time(1);
    this.sharedService.sharedServiceData.next(1);
    this.getUpdatedData();
  }

  getUpdatedData() {
    this.apiService.addSubject.subscribe((res: any) => {
      console.log(res);
      if (res !== 1 && res !== 0) {
        console.log(res);
        // this.getRecipeDetailPumps(1, res);
        // this.getRecipeDetailName(1, res);
        // this.getRecipe_detail_run_time(1, res);
      }
    });
  }

  addRecipeGrowth() {
    this.router.navigate(['/component1/', { outlets: { RECIPE_MODAL: ['add-new', 'Add New'] } }]);
  }

  editRecipeGrowth(data: any) {
    this.router.navigate(['/', 'component1', 'add-recipe', data.id]);
    // this.sharedService.sharedServiceData.next(data);
    // this.router.navigate([
    //   '/component1/',
    //   { outlets: { RECIPE_MODAL: ['add-new', 'Edit'] } },
    // ]);
  }

  async delete(data: any) {
    this.confirm.show(`Are you sure you want to delete?`).then((opt) => {
      if (opt == true) {
        this.apiService.deleteRecipeeGrowthPlanData(data).subscribe((res: any) => {
          this.apiService.actionSubject.next(1);
        });
      }
    });
  }

  addRecipe() {
    this.router.navigate(['/component1/', { outlets: { RECIPE_MODAL: ['add-new', 'Add New'] } }]);
  }

  // getRecipeDetailPumps(id: any, data: any) {
  //   this.apiService.getRecipe_detail_pumps(id).subscribe((res: any) => {
  //     this.recipeDetailPumps = res;
  //     console.log(this.recipeDetailPumps);
  //     this.recipeDetailPumps.id = data.id;
  //     setTimeout(() => {
  //       this.apiService
  //         .createRecipe_detail_pumps(this.recipeDetailPumps)
  //         .subscribe(
  //           (res: any) => {
  //             console.log(res);
  //           },
  //           (eror: any) => {
  //             delete this.recipeDetailPumps.id;
  //             this.apiService
  //               .createOrAddRecipe_detail_pumps(this.recipeDetailPumps)
  //               .subscribe((res: any) => {
  //                 console.log(res);
  //               });
  //           }
  //         );
  //     }, 2000);
  //     console.log(this.recipeDetailPumps);
  //   });
  // }

  // getRecipeDetailName(id: any, data: any) {
  //   this.apiService.getRecipe_detail_name(id).subscribe(
  //     (res: any) => {
  //       this.recipee_details = res;
  //       this.recipee_details.id = data.id;
  //       this.recipee_details.data = [];
  //       setTimeout(() => {
  //         this.apiService
  //           .createRecipe_detail_name(this.recipee_details)
  //           .subscribe(
  //             (res: any) => {
  //               console.log(res);
  //             },
  //             (eror: any) => {
  //               delete this.recipee_details.id;
  //               this.apiService
  //                 .createOrAddRecipe_detail_name(this.recipee_details)
  //                 .subscribe((res: any) => {
  //                   console.log(res);
  //                 });
  //             }
  //           );
  //       }, 2000);
  //       console.log(this.recipeGrowthData);
  //     },
  //     (err: any) => {}
  //   );
  // }

  // getRecipe_detail_run_time(id: any, data: any) {
  //   this.apiService.getRecipe_detail_run_time(id).subscribe(
  //     (res: any) => {
  //       this.run_time_details = res;
  //       this.run_time_details.id = data.id;
  //       this.run_time_details.data = [];
  //       setTimeout(() => {
  //         this.apiService
  //           .createRecipe_detail_run_time(this.run_time_details)
  //           .subscribe(
  //             (res: any) => {
  //               console.log(res);
  //             },
  //             (error: any) => {
  //               delete this.run_time_details.id;
  //               this.apiService
  //                 .createOrAddRecipe_detail_run_time(this.run_time_details)
  //                 .subscribe((res: any) => {
  //                   console.log(res);
  //                 });
  //             }
  //           );
  //       }, 2000);
  //     },
  //     (err: any) => {}
  //   );
  // }
}
