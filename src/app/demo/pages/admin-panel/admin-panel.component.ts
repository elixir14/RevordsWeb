import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent {
  navLinks: any[];
  activeLinkIndex = -1;
  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'Business Group',
        link: '/BusinessGroup',
        index: 0,
        class: 'fa fa-users'
      },
      {
        label: 'Business Location',
        link: '/BusinessProfile',
        index: 1,
        class: 'fa fa-map-marker'
      },
      {
        label: 'Sources',
        link: '/Sources',
        index: 2,
        class: 'fa fa-scribd'
      },
      {
        label: 'Users',
        link: '/User',
        index: 3,
        class: 'fa fa-user'
      },
    ];
  }
  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }
}
