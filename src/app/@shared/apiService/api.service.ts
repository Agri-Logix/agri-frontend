import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  detailsSubject = new BehaviorSubject(0);
  actionSubject = new BehaviorSubject(0);

  getIrrigationData(): Observable<any> {
    return this.http.get<any>(`/irrigation`);
  }

  getRecipeGrowthPlan(): Observable<any> {
    return this.http.get<any>(`/recipees`);
  }

  insertRecipe(bodyParams: any) {
    return this.http.post(`/recipees`, bodyParams);
  }

  editRecipe(bodyParams: any) {
    return this.http.put(`/recipees`, bodyParams);
  }
}
