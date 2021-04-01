import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Heatmap from 'visual-heatmap';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss'],
})
export class HeatmapComponent implements OnInit {
  @ViewChild('canv') canvasdiv: ElementRef;

  data: any = [];
  instance: any;
  imageUrl: any;

  images: any = [];
  valObjArr: any = [];

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      const canvas = document.getElementById('canvas');
      this.instance = Heatmap('#' + canvas.id, {
        size: 25.0,
        max: 5,
        blur: 1.0,
        translate: [20, 20],
        gradient: [
          {
            color: [0, 0, 255, 1.0], // blue
            offset: 0,
          },
          {
            color: [0, 0, 255, 1.0], // blue
            offset: 0.2,
          },
          {
            color: [0, 255, 0, 1.0], // lime green
            offset: 0.45,
          },
          {
            color: [255, 255, 0, 1.0], // yellow
            offset: 0.85,
          },
          {
            color: [255, 0, 0, 1.0], // red
            offset: 1.0,
          },
        ],
      });
      // this.data = this.generateData(100000);
      // console.log(this.data);

      // generate sample x,y data for heatmap report

      // for (let j = 1; j < 20; j++) {
      //   let dataArr = [];
      // for (let i = 0; i < 10; i++) {
      //   const obj = { x: i * j * 2, y: i * j * 2, value: i };
      //   dataArr.push(obj);
      //   this.data.push(obj);
      // }
      this.data = [
        { x: 0, y: 0, value: 0 },
        { x: 38, y: 38, value: 1 },
        { x: 76, y: 76, value: 2 },
        { x: 114, y: 114, value: 3 },
        { x: 152, y: 152, value: 4 },
        { x: 190, y: 190, value: 5 },
        { x: 228, y: 228, value: 6 },
        { x: 266, y: 266, value: 7 },
        { x: 304, y: 304, value: 8 },
        { x: 342, y: 342, value: 9 },
      ];
      console.log(this.data);
      this.valObjArr.push(this.data);
      this.instance.renderData(this.data);
      console.log(this.canvasdiv);
      const canvasEle: HTMLCanvasElement = this.canvasdiv.nativeElement.lastElementChild as HTMLCanvasElement;
      this.imageUrl = canvasEle.toDataURL('image/jpg');
      this.images.push(this.imageUrl);

      setTimeout(() => {
        this.setRenderData();
        this.setData();
      }, 500);
    }, 5000);
    // this.instance.renderData(this.data);
  }

  indexCount = 0;

  setRenderData() {
    const valobj = this.valObjArr[this.indexCount];
    this.instance.renderData(valobj);
    // if (this.indexCount === this.valObjArr.length - 1) {
    //   this.indexCount = 0;
    // } else {
    //   this.indexCount++;
    // }
  }

  setData() {
    this.imageUrl = this.images[this.indexCount];
    // if (this.indexCount === this.images.length - 1) {
    //   this.indexCount = 0;
    // } else {
    //   this.indexCount++;
    // }
  }

  generateData(count: any) {
    var data = [];
    let val = 50;
    for (let i = 0; i < count; i++) {
      let val = Math.random() * 100;
      data.push({
        x: this.random(0, this.instance.width),
        y: this.random(0, this.instance.height),
        velX: this.random(-0.5, 0.25),
        velY: this.random(-0.5, 0.25),
        value: val,
      });
    }
    return data;
  }

  random(min: any, max: any) {
    var num = Math.random() * (max - min) + min;
    return num;
  }
}
