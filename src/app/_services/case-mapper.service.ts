import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaseMapperService {

  constructor() { }

  public toSnakeCase(obj: any) {
    const snakeCaseObj: any = {};
    Object.keys(obj).forEach(key => {
      snakeCaseObj[key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)] = obj[key];
    });
    return snakeCaseObj;
  }
}
