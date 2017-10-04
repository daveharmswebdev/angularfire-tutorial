import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';

import { ContactService } from '../contact.service';
import { Contact } from '../contact';
import { CompanyService } from '../../company/company.service';
import { Observable } from 'rxjs/Observable';
import { Company } from '../../company/company';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  companies$: Observable<Company[]>;
  contacts$: FirebaseListObservable<Contact[]>;

  constructor(
    private companyService: CompanyService,
    public contactService: ContactService) { }

  ngOnInit() {
    this.companies$ = this.companyService.getCompanies();
    this.getContacts();
  }

  getContacts() {
    this.contacts$ = this.contactService.getContacts();
  }

}
