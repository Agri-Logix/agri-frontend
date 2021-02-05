import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ApiService } from '@app/@shared/apiService/api.service';
import { SharedService } from '@app/@shared/services/shared.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-recipe-add-cycle-modal',
  templateUrl: './recipe-add-cycle-modal.component.html',
  styleUrls: ['./recipe-add-cycle-modal.component.scss'],
})
export class RecipeAddCycleModalComponent implements OnInit {
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

  ngOnInit(): void {}

  private createForm() {
    this.Form = this.formBuilder.group({
      days: [''],
      stage: [''],
      grow_A: [''],
      grow_B: [''],
      bloom_A: [''],
      bloom_B: [''],
      e_plus: [''],
      ph: [''],
      ec: [''],
      tds: [''],
      // date: ['', Validators.required],
    });
  }

  getSelectionChange() {}

  getDetails() {
    this.subscription = this.sharedService.sharedServiceData.subscribe(async (res: any) => {
      this.details = res;
      console.log(this.details);

      if (this.details == 0) {
        this._location.back();
      } else if (this.details) {
      }
    });
  }

  add() {
    this.isLoading = true;

    this.isLoading = false;
  }

  update() {
    this.isLoading = true;
    this.isLoading = false;
  }

  close() {
    this.modalService.dismissAll();
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
    this.sharedService.sharedServiceData.next(null);
  }
}
