import {Component, Input, OnInit} from '@angular/core';
import {FileUploader} from "ng2-file-upload";
import {IUser} from "../../_models/user";
import {environment} from "../../../environments/environment";
import {AccountService} from "../../_services/account.service";
import {take} from "rxjs";
import {MachinesService} from "../../_services/machines.service";
import {IMachine} from "../../_models/machine";

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit{
  @Input() machine: IMachine | undefined;
  uploader: FileUploader | undefined;
  hasBaseDropZoneOver: boolean = false;
  baseUrl: string = environment.apiUrl;
  user: IUser | undefined;

  constructor(private accountService: AccountService, private machinesService: MachinesService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if(user == null)
          return;
        this.user = user
      }
    })
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  deletePhoto() {
    if (this.machine == null)
      return;
    this.machinesService.deletePhoto(this.machine.id).subscribe({
      next: () => {
        if(this.machine == null)
          return;
        delete this.machine.imageUrl;
      }
    });
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: `${this.baseUrl}machines/${this.machine?.id}/images`,
      authToken: `Bearer ${this.user?.token}`,
      isHTML5: true,
      allowedFileType: ["image"],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (_item, response, _status, _headers) => {
      if(response == null || this.machine == null)
        return;

      this.machinesService.addMachineImageUrl(this.machine.id, JSON.parse(response).imageUrl).pipe(take(1)).subscribe({
        next: () => {
          if(this.machine == null)
            return;
          this.machine.imageUrl = JSON.parse(response).imageUrl;
        }
      })
    }
  }
}
