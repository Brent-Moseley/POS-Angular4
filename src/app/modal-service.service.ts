import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class ModalService {

  // Observable string sources
  private modalTitleSource = new Subject<string>();
  private modalBodySource = new Subject<string>();
  private modalResponseSource = new Subject<string>();

  // Observable string streams
  modalTitleSource$ = this.modalTitleSource.asObservable();
  modalBodySource$ = this.modalBodySource.asObservable();
  modalResponseSource$ = this.modalResponseSource.asObservable();

  // Service message commands
  setModalTitle(title: string) {
    this.modalTitleSource.next(title);
  }

  setModalBody(body: string) {
    this.modalBodySource.next(body);
  }

  setModalResponse(response: string) {
    this.modalResponseSource.next(response);
  }

}
