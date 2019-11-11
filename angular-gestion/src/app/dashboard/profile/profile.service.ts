import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  personalSubject = new BehaviorSubject<any>(null);

  constructor() {
  }

  setPersonal(personal: any) {
    localStorage.setItem('details_personal', JSON.stringify(personal));
    this.personalSubject.next(personal);
  }

  setWorkType(workType: any) {
    localStorage.setItem('details_work', JSON.stringify(workType));
  }

  setAddress(address: any) {
    localStorage.setItem('details_address', JSON.stringify(address))
  }

  getPersonal() {
    return JSON.parse(localStorage.getItem('details_personal'))
  }

  getWorkType() {
    return JSON.parse(localStorage.getItem('details_work'))
  }

  getAddress() {
    return JSON.parse(localStorage.getItem('details_address'))
  }

  setMergedSteps() {
    Object.assign(this.getPersonal(), this.getWorkType(), this.getAddress());
  }

  resetSteps() {
    localStorage.removeItem('details_personal');
    localStorage.removeItem('details_work');
    localStorage.removeItem('details_address');
  }
}
