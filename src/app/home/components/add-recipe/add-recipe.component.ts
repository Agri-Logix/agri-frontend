import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/@shared/apiService/api.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss'],
})
export class AddRecipeComponent implements OnInit {
  constructor(private _router: ActivatedRoute, public apiService: ApiService) {
    this._router.queryParams.subscribe((params) => {
      console.log(params);
    });
  }

  ngOnInit(): void {}
}
