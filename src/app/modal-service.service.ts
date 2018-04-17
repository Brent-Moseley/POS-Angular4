import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class ModalService {

  // Observable string sources
  private modalTitleSource = new Subject<string>();
  private modalBodySource = new Subject<string>();
  private modalResponseSource = new Subject<string>();
  private modalButtonPrimarySource = new Subject<string>();;
  private modalButtonSecondarySource = new Subject<string>();;


  // Observable string streams
  modalTitleSource$ = this.modalTitleSource.asObservable();
  modalBodySource$ = this.modalBodySource.asObservable();
  modalResponseSource$ = this.modalResponseSource.asObservable();
  modalButtonPrimary$ = this.modalButtonPrimarySource.asObservable();
  modalButtonSecondary$ = this.modalButtonSecondarySource.asObservable();

  // Service message commands
  setModalTitle(title: string) {
    this.modalTitleSource.next(title);
  }

  setModalBody(body: string) {
    this.modalBodySource.next(body);
  }

  setButtons(buttonPri: string, buttonSec: string) {
    this.modalButtonPrimarySource.next(buttonPri);
    this.modalButtonSecondarySource.next(buttonSec);
  }

  setModalResponse(response: string) {
    this.modalResponseSource.next(response);
  }

}
