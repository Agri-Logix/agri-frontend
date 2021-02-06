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
    return this.http.get<any>(`/recipee_growth_plan`);
  }

  getSingleRecipeGrowthPlan(id: number): Observable<any> {
    return this.http.get<any>(`/recipee_growth_plan/${id}`);
  }

  insertRecipeGrowthPlan(bodyParams: any) {
    return this.http.post(`/recipee_growth_plan`, bodyParams);
  }

  insertRecipedetails(bodyParams: any) {
    return this.http.post(`/recipe_detail_name`, bodyParams);
  }

  getRecipePumps(id: number) {
    return this.http.get(`/recipe_detail_pumps/${id}`);
  }

  getRecipeDetails(id: number) {
    return this.http.get(`/recipe_detail_name/${id}`);
  }

  getRecipeRuntimes(id: number) {
    return this.http.get(`/recipe_detail_run_time/${id}`);
  }

  editRecipe(bodyParams: any) {
    return this.http.put(`/recipees`, bodyParams);
  }

  editRecipeDetails(id: number, bodyParams: Object) {
    return this.http.patch(`/recipe_detail_name/${id}`, bodyParams);
  }
  editRecipePumps(id: number, bodyParams: Object) {
    return this.http.patch(`/recipe_detail_pumps/${id}`, bodyParams);
  }
}
