import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ApiService } from '@app/@shared/apiService/api.service';
import { SharedService } from '@app/@shared/services/shared.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-recipe-modal',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss'],
})
export class AddRecipeModalComponent implements OnInit {
  Form!: FormGroup;
  error: any;
  isLoading: boolean = false;
  fileData: File = null;
  selected: any = '';
  type: any = 'Add New';
  subscription: Subscription;
  details: any;
  @Output() onPage = new EventEmitter();
  todayDate: Date = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public modalService: NgbModal,
    private _location: Location,
    private apiService: ApiService,
    private sharedService: SharedService
  ) {
    this.route.params.subscribe((params) => {
      this.type = params['type'];
    });
    this.createForm();
  }

  ngOnInit(): void {
    this.getDetails();
  }

  private createForm() {
    this.Form = this.formBuilder.group({
      name: [''],
      description: [''],
      total_days: [''],
      last_updated: new Date(),
      next_sched: new Date(),

      // date: ['', Validators.required],
    });
  }

  getSelectionChange() {}

  getDetails() {
    this.subscription = this.sharedService.sharedServiceData.subscribe(async (res: any) => {
      this.details = res;
      console.log(this.details);
      if (this.details == 0 && Object.keys(this.details).length == 0) {
        this._location.back();
      } else if (this.details) {
        this.Form.patchValue({
          name: this.details.name,
          description: this.details.description,
          total_days: this.details.total_days,
          last_updated: this.details.last_updated,
          next_sched: this.details.next_sched,
        });
      }
    });
  }

  add() {
    this.isLoading = true;
    (this.Form.value.last_updated = new Date()),
      (this.Form.value.next_sched = new Date()),
      this.apiService.addRecipeeGrowthPlanData(this.Form.value).subscribe(
        (res: any) => {
          this.apiService.actionSubject.next(1);
          // this.apiService.addSubject.next(res);
          this._location.back();
          this.isLoading = false;
        },
        (error: any) => {
          console.log(error);
        }
      );
    this.isLoading = false;
  }

  update() {
    this.isLoading = true;
    console.log(this.Form.value);
    (this.Form.value.id = this.details.id),
      this.apiService.updateRecipeeGrowthPlanData(this.Form.value).subscribe(
        (res: any) => {
          this.apiService.actionSubject.next(1);
          this._location.back();
          this.isLoading = false;
        },
        (error: any) => {
          console.log(error);
          this.isLoading = false;
        }
      );
  }

  close() {
    this.modalService.dismissAll();
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
    this.sharedService.sharedServiceData.next(null);
  }
}
