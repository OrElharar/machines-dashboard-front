import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserParams} from "../_models/userParams";

@Component({
  selector: 'app-client-side-pagination',
  templateUrl: './client-side-pagination.component.html',
  styleUrls: ['./client-side-pagination.component.css']
})
export class ClientSidePaginationComponent {
  @Input() userParams: UserParams | undefined;
  @Input() totalItems: number = 0;
  @Output() pageClicked = new EventEmitter<number>();

  visiblePages: number = 10;

  constructor() {}

  get pages(): number[] {
    if(this.userParams == null)
      return [];
    const numberOfPages = Math.ceil(this.totalItems / this.userParams.pageSize);
    return Array.from({length: numberOfPages}, (_, i) => i + 1)
  }

  getTotalPages(): number {
    if(this.userParams == null)
      return 0;
    return Math.ceil(this.totalItems / this.userParams.pageSize);
  }

  getVisiblePageRange(): number[] {
    if(this.userParams == null)
      return [];
    const currentPage = this.userParams.pageNumber;
    const totalPages = this.getTotalPages();

    const halfVisiblePages = Math.floor(this.visiblePages / 2);
    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = Math.min(startPage + this.visiblePages - 1, totalPages);

    if (endPage - startPage + 1 < this.visiblePages) {
      // Adjust the startPage to show the desired number of pages
      startPage = Math.max(endPage - this.visiblePages + 1, 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }

  onClickedPage(number: number) {
    this.pageClicked.emit(number);
  }

}
