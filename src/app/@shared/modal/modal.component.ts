import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, Output, EventEmitter, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SharedService } from '@app/@shared/services/shared.service';

@Component({
  selector: 'app-modal',
  exportAs: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  closeResult = '';
  modalReference: any;
  @ViewChild('content', { static: false }) content: ElementRef;

  @Input() size: string = 'md'; //size could be sm , lg , xl
  @Input() isLoading: Boolean = false;
  constructor(public modalService: NgbModal, private _location: Location, private sharedService: SharedService) {}
  ngOnInit() {}
  ngAfterViewInit() {
    this.open(this.content);
  }
  open(content: any) {
    console.log(content);

    this.modalReference = this.modalService.open(content, {
      centered: true,
      size: this.size,
      scrollable: true,
      backdrop: 'static',
      keyboard: false,
    });
    this.modalReference.result.then(
      (result: any) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason: any) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    this.close();
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onclose() {
    console.log('event');
  }
  close(event?: any) {
    console.log(event);
    // this.modalService.close('Cross click');
    this.modalReference.close();
    this._location.back();
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.modalReference.close();
  }
}
