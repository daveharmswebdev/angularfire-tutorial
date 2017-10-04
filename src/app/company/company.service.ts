import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  FirebaseObjectObservable,
  FirebaseListObservable
} from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';

import { Company } from './company';



@Injectable()
export class CompanyService {
  company$: FirebaseObjectObservable<Company>;
  companies$: FirebaseListObservable<Company[]>;

  constructor(private db: AngularFireDatabase) {
    this.company$ = this.db.object(`company`);
    this.companies$ = this.db.list(`companies`);
  }

  getCompany(key: string) {
    console.log(key);
    return this.db.object(`companies/${key}`)
      .catch(this.errorHandler);
  }

  getCompanies() {
    return this.companies$
      .catch(this.errorHandler);
  }

  saveCompany(company) {
    return this.companies$.push(company)
      .then(_ => console.log('success'))
      .catch(error => console.log(error));
  }

  editCompany(company: Company) {
    return this.companies$.update(company.$key, company)
      .then(_ => console.log('success'))
      .catch(error => console.log(error));
  }

  removeCompany(company: Company) {
    return this.companies$.remove(company.$key)
      .then(_ => console.log('success'))
      .catch(error => console.log(error));
  }

  private errorHandler(error) {
    console.log(error);
    return Observable.throw(error);
  }
}
