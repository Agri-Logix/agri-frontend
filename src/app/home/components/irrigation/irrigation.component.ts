import { Component, Input, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-irrigation',
  templateUrl: './irrigation.component.html',
  styleUrls: ['./irrigation.component.css'],
})
export class IrrigationComponent implements OnInit {
  rowData: any = [];
  @Input('irrigationData') irrigationData: Observable<any>;
  constructor(private media: MediaObserver) {
    // this.setIrrigationData();
  }

  ngOnInit() {
    // console.log(this.irrigationData.);
    // this.irrigationData.subscribe((res: any) => {
    //   console.log(res);
    // });
  }

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }

  setIrrigationData() {
    this.rowData = [
      {
        id: 1,
        room: 'Room 1',
        recipe: 'Green Crack (1/2)',
        run_time: '27 mins',
        shutoff_time: new Date(),
        next_sched_start: new Date(),
        status: true,
      },
      {
        id: 2,
        room: 'Room 2',
        recipe: 'Green Crack (1/2)',
        run_time: '28 mins',
        shutoff_time: new Date(),
        next_sched_start: new Date(),
        status: true,
      },
      {
        id: 3,
        room: 'Room 3',
        recipe: 'Green Crack (1/2)',
        run_time: '29 mins',
        shutoff_time: new Date(),
        next_sched_start: new Date(),
        status: true,
      },
      {
        id: 4,
        room: 'Room 4',
        recipe: 'Green Crack (1/2)',
        run_time: '30 mins',
        shutoff_time: new Date(),
        next_sched_start: new Date(),
        status: false,
      },
    ];
  }
}
