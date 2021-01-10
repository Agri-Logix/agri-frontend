import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public searchEventSource = new Subject<string>();
  public placeholderEventSource = new Subject<string>();

  constructor() {}
}
