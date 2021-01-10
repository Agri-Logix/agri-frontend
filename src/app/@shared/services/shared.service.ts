import { map, filter, share } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  sharedServiceData = new BehaviorSubject(0);
  updateTableAction = new BehaviorSubject(0);
  updateProfileAction = new BehaviorSubject(0);
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  // callSubject() {
  //   this.shareWithReplay.next(this.data);
  // }
}
