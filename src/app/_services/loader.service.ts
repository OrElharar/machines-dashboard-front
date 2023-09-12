import { Injectable } from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loadingRequestsCount = 0;

  constructor(private spinnerService: NgxSpinnerService) { }

  loading() {
    this.loadingRequestsCount++;
    this.spinnerService.show(undefined, {
      type: "line-scale",
      bdColor: "rgba(255,255,255,0)",
      color: "#333333"
    });
  }

  idle() {
    this.loadingRequestsCount--;
    if(this.loadingRequestsCount > 0)
      return;
    this.loadingRequestsCount = 0;
    this.spinnerService.hide();

  }
}
