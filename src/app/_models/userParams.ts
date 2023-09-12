import {IUser} from "./user";

export class UserParams{
  manufacturerId: number | undefined;
  pageNumber: number = 1;
  pageSize: number = 5;
  skip: number = 0;
  isRefreshing: boolean = false;

  constructor({user, pageSize, pageNumber, isRefreshing}:{user: IUser | null, pageSize?: number, pageNumber?: number, isRefreshing?: boolean}) {
    if(pageSize != null)
      this.pageSize = pageSize;
    if(pageNumber != null)
      this.pageNumber = pageNumber;
    if(isRefreshing != null)
      this.isRefreshing = isRefreshing;

  }
}
