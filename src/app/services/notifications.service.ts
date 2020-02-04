import { Injectable } from '@angular/core';
import { NotifierService } from "angular-notifier";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private Notifier: NotifierService) { }

  public show(type:string, msj:string) {
    this.Notifier.notify(type, msj);
  }

  public hide(){
    this.Notifier.hideNewest();
  }
}
