import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { CompanyService } from '../company.service';
import { Company } from '../Company';

import {Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  company$: FirebaseObjectObservable<Company> | any;
  companyKey: string;
  isNewCompany: boolean;

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.companyKey = this.activatedRoute.snapshot.params['id'];
    this.isNewCompany = this.companyKey === 'new';
    !this.isNewCompany ? this.getCompany() : this.company$ = Observable.of({}) as FirebaseObjectObservable<Company>;
  }

  getCompany() {
    this.company$ = this.companyService.getCompany(this.companyKey);
  }

  saveCompany(company) {
    const save = this.isNewCompany
    ? this.companyService.saveCompany(company)
    : this.companyService.editCompany(company);

    save.then(_ => this.router.navigate(['company-list']));
  }

  removeCompany(company) {
    this.company$.remove()
    .then(_ => this.router.navigate(['company-list']));
  }
}
