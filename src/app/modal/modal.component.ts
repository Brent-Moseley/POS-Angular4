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
  buttonPrimary: string = '';
  buttonSecondary: string = '';

  constructor(private modalService: ModalService) {
    this.modalService.modalTitleSource$.subscribe(
      title => {
        this.title = title;
        console.log('title: ' + title);
      }
    );

    this.modalService.modalBodySource$.subscribe(
      body => {
        this.body = body;
        console.log('body: ' + body);
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

  close(cont: string) {
    this.modalService.setModalResponse(cont);
  	$('#messageModal').hide();
  }

}


// TODO:  upgrade to this:  https://ng-bootstrap.github.io/#/components/modal/examples
