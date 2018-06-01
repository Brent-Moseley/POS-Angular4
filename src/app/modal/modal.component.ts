import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal-service.service';
import $ = require('jquery');

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  title: string = '';
  body: string = '';
  showInput: boolean = false;
  buttonPrimary: string = '';
  buttonSecondary: string = '';

  constructor(private modalService: ModalService) {
    this.modalService.modalTitleSource$.subscribe(
      title => {
        this.title = title;
      }
    );

    this.modalService.modalBodySource$.subscribe(
      body => {
        this.body = body;
      }
    );
    this.modalService.modalShowInputSource$.subscribe(
      show => {
        this.showInput = show;
      }
    );
    this.modalService.modalButtonPrimary$.subscribe(
      text => {
        this.buttonPrimary = text;
      }
    );
    this.modalService.modalButtonSecondary$.subscribe(
      text => {
        this.buttonSecondary = text;
      }
    );
  }

  ngOnInit() {
  }

  close(cont: string, value: string) {
    if (this.showInput && cont) this.modalService.setModalResponse(value);
    else this.modalService.setModalResponse(cont);
    console.log('Closing');
  	$('#messageModal').hide();
  }

}


// TODO:  upgrade to this:  https://ng-bootstrap.github.io/#/components/modal/examples
