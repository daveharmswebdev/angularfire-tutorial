import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { ContactService } from '../contact.service';
import { CompanyService } from './../../company/company.service';
import { Contact } from '../Contact';
import { Company } from '../../company/company';

import {Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  companies$: Observable<Company[]>;
  // contact = {name: ''} as Contact;
  contact = {name: ''} as Contact;
  contactKey: string;
  isNewContact: boolean;
  selectedCompany: Company;
  contactCompanies = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService,
    private companyService: CompanyService
  ) { }

  ngOnInit() {
    this.companies$ = this.companyService.getCompanies();
    this.contactKey = this.activatedRoute.snapshot.params['id'];
    this.isNewContact = this.contactKey === 'new';
    console.log(!this.isNewContact);
    if (!this.isNewContact) { this.getContact(); }
  }

  getContact() {
    this.contactService.getContact(this.contactKey)
      .subscribe(contact => {
        this.contact = contact;
        this.setContactCompanies();
      });
  }

  setContactCompanies() {
    if (this.contact.contactCompanies == null) { this.contact.contactCompanies = {}; }
    this.contactCompanies = Object.keys(this.contact.contactCompanies).map(key => this.contact.contactCompanies[key]);
  }

  addCompany() {
    this.contact.contactCompanies[this.selectedCompany.$key] = { name: this.selectedCompany.name };
    this.setContactCompanies();
  }

  saveContact(contact) {
    const save = this.isNewContact
    ? this.contactService.saveContact(contact)
    : this.contactService.editContact(contact);

    save.then(_ => this.router.navigate(['contact-list']));
  }

  removeContact(contact) {
    this.contactService.removeContact(contact)
    .then(_ => this.router.navigate(['contact-list']));
  }
}
