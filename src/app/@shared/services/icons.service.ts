import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

interface ICON {
  name: String;
  path: String;
}

// TODO: add new icon in this list
const icons: ICON[] = [
  //custom fz3a svg icons
  { name: 'login_background', path: '/assets/login-page-background.svg' },
  { name: 'custom_vector', path: '/assets/custom_vector.svg' },
  { name: 'custom_vector_white', path: '/assets/custom_vector_white.svg' },
  { name: 'custom_vector_black', path: '/assets/custom_vector_black.svg' },
  { name: 'custom_mobile_black', path: '/assets/custom_mobile_black.svg' },
  { name: 'custom_home_black', path: '/assets/custom_home_black.svg' },
  { name: 'custom_leaf_black', path: '/assets/custom_leaf_black.svg' },
  { name: 'custom_home', path: '/assets/custom_home.svg' },
  { name: 'custom_leaf', path: '/assets/custom_leaf.svg' },
  { name: 'custom_mobile', path: '/assets/custom_mobile.svg' },
  { name: 'custom_password', path: '/assets/password.svg' },
  { name: 'custom_email', path: '/assets/email-84.svg' },
  { name: 'custom_customers', path: '/assets/custom_customers.svg' },
  { name: 'custom_dashboard', path: '/assets/custom_dashboard.svg' },
  { name: 'custom_employees', path: '/assets/custom_employees.svg' },
  { name: 'custom_logout', path: '/assets/custom_logout.svg' },
  { name: 'custom_logo', path: '/assets/custom_logo.svg' },
  { name: 'custom_orders', path: '/assets/custom_orders.svg' },
  { name: 'custom_prod_offers', path: '/assets/custom_prod_offers.svg' },
  { name: 'custom_products', path: '/assets/custom_products.svg' },
  { name: 'custom_calender', path: '/assets/custom_calender.svg' },
  { name: 'custom_pencil', path: '/assets/custom_pencil.svg' },
  { name: 'custom_trash', path: '/assets/custom_trash.svg' },
  { name: 'custom_user', path: '/assets/custom_user.svg' },
  { name: 'custom_history', path: '/assets/custom_history.svg' },
  { name: 'custom_graduate', path: '/assets/custom_graduate.svg' },
  { name: 'custom_national_id', path: '/assets/custom_national_id.svg' },
  { name: 'custom_password', path: '/assets/custom_password.svg' },
  { name: 'custom_service', path: '/assets/custom_service.svg' },
  //custom fz3a svg icons ends

  { name: 'home', path: '/assets/icofont/fonts/home.svg' },
  { name: 'user', path: '/assets/icofont/fonts/user.svg' },
  { name: 'bell', path: '/assets/icofont/fonts/bell.svg' },
  { name: 'chatting', path: '/assets/icofont/fonts/chatting.svg' },
  { name: 'complaints', path: '/assets/icofont/fonts/complaints.svg' },
  { name: 'list', path: '/assets/icofont/fonts/list.svg' },
  { name: 'report', path: '/assets/icofont/fonts/reports.svg' },
  { name: 'ad', path: '/assets/icofont/fonts/ad.svg' },
  { name: 'person', path: '/assets/icofont/fonts/person.svg' },
  { name: 'persons', path: '/assets/icofont/fonts/persons.svg' },
  { name: 'cardIcon1', path: '/assets/icofont/fonts/cardIcon1.svg' },
  { name: 'cardIcon2', path: '/assets/icofont/fonts/cardIcon2.svg' },
  { name: 'cardIcon3', path: '/assets/icofont/fonts/cardIcon3.svg' },
  { name: 'cardIcon4', path: '/assets/icofont/fonts/cardIcon4.svg' },
  { name: 'calendar', path: '/assets/icofont/fonts/calendar.svg' },
  { name: 'grid', path: '/assets/icofont/fonts/grid.svg' },
];

@Injectable({
  providedIn: 'root',
})
export class IconsService {
  baseURL = '';

  constructor(public iconRegistry: MatIconRegistry, public sanitizer: DomSanitizer) {
    // base url depends on the enviorment. it is your site domain
    // like http://localhost:4200 or http://example.com
    this.baseURL = window.location.origin;
  }

  registerIcons() {
    //registered your icons
    icons.forEach((e: any) => {
      this.iconRegistry.addSvgIcon(e.name, this.sanitizer.bypassSecurityTrustResourceUrl(this.baseURL + e.path));
    });
  }
}
