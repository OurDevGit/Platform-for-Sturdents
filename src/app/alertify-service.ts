import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
  constructor() {}

  confirm(message: string, okCallback: () => any) {
    alertify.confirm(message, function(e) {
      if (e) {
        okCallback();
      } else {}
    });
  }

  
  reload(message: string, title: string) {
    alertify
    .alert(message, function(){
      alertify.message('OK');
      location.reload();
    }).setHeader(title);
  } 

  success(message: string, title: string) {
    alertify.alert(message).setHeader(title); 
  }

  error(message: string, title: string) {
    alertify.alert(message).setHeader(title); 
  }

  warning(message: string, title: string) {
    alertify.alert(message).setHeader(title); 
  }

  message(message: string, title: string) {
    alertify.alert(message).setHeader(title); 
  }
}
