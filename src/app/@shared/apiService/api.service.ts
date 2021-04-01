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
  addSubject = new BehaviorSubject(0);
  getIrrigationData(): Observable<any> {
    return this.http.get<any>(`/irrigation`);
  }

  getRecipeeGrowthPlanData(): Observable<any> {
    return this.http.get<any>(`/recipee_growth_plan`);
  }

  addRecipeeGrowthPlanData(data: any): Observable<any> {
    return this.http.post<any>(`/recipee_growth_plan`, data);
  }

  deleteRecipeeGrowthPlanData(data: any): Observable<any> {
    return this.http.delete<any>(`/recipee_growth_plan/${data.id}`);
  }

  updateRecipeeGrowthPlanData(data: any): Observable<any> {
    return this.http.patch<any>(`/recipee_growth_plan/${data.id}`, data);
  }
  getRecipe_detail_pumps(id: any): Observable<any> {
    return this.http.get<any>(`/recipe_detail_pumps/${id}`);
  }

  //For lights

  getRecipe_detail_lights(id: any): Observable<any> {
    return this.http.get<any>(`/recipe_detail_lights/${id}`);
  }

  getRecipe_detail_lights_name(id: any): Observable<any> {
    return this.http.get<any>(`/recipe_detail_lights_name/${id}`);
  }

  addRecipe_detail_lights_name(data: any) {
    return this.http.post<any>(`/recipe_detail_lights_name`, data);
  }

  putRecipe_detail_lights_name(data: any) {
    console.log(data);
    return this.http.put<any>(`/recipe_detail_lights_name/${data.id}`, data);
  }

  getRecipe_detail_lights_run_time(id: any): Observable<any> {
    return this.http.get<any>(`/recipe_detail_lights_run_time/${id}`);
  }

  //lights end

  createOrAddRecipe_detail_run_time(data: any): Observable<any> {
    return this.http.post<any>(`/recipe_detail_run_time`, data);
  }

  createOrAddRecipe_detail_name(data: any): Observable<any> {
    return this.http.post<any>(`/recipe_detail_name`, data);
  }

  updateRecipe_detail_pumps(data: any): Observable<any> {
    return this.http.put<any>(`/recipe_detail_pumps/${data.id}`, data);
  }

  addOrCreateRecipe_detail_pumps(data: any): Observable<any> {
    return this.http.post<any>(`/recipe_detail_pumps`, data);
  }

  getRecipe_detail_run_time(id: any): Observable<any> {
    return this.http.get<any>(`/recipe_detail_run_time/${id}`);
  }

  addRecipe_detail_run_time(data: any): Observable<any> {
    return this.http.put<any>(`/recipe_detail_run_time/${data.id}`, data);
  }

  getRecipe_detail_name(id: any): Observable<any> {
    return this.http.get<any>(`/recipe_detail_name/${id}`);
  }

  addRecipe_detail_name(data: any) {
    return this.http.put<any>(`/recipe_detail_name/${data.id}`, data);
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
