// Modal service allows components to "talk to each other", ie a web page component to set values for the modal component.

import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';      // docs:  http://reactivex.io/rxjs/manual/overview.html

@Injectable()     // marks a class as available to Injector for creation.
export class ModalService {

  // Observable string sources
  // An RxJS Subject is a special type of Observable that allows values to be multicasted to many Observers. May convert to unicast observable.
  private modalTitleSource = new Subject<string>();   
  private modalBodySource = new Subject<string>();    // perhaps similar to a topic in pub sub.
  private modalShowInputSource = new Subject<boolean>();
  private modalResponseSource = new Subject<string>();
  private modalButtonPrimarySource = new Subject<string>();
  private modalButtonSecondarySource = new Subject<string>();


  // Observable string streams
  modalTitleSource$ = this.modalTitleSource.asObservable();
  modalBodySource$ = this.modalBodySource.asObservable();
  modalShowInputSource$ = this.modalShowInputSource.asObservable();
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

  setModalShowInput(input: boolean) {
    this.modalShowInputSource.next(input);
  }

  setButtons(buttonPri: string, buttonSec: string) {
    this.modalButtonPrimarySource.next(buttonPri);
    this.modalButtonSecondarySource.next(buttonSec);
  }

  setModalResponse(response: string) {
    this.modalResponseSource.next(response);
  }

}
