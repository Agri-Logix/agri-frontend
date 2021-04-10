import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export interface ROUTES {
  link: string;
  name: string;
  icon: string;
  icon_active: string;
}

@Injectable({
  providedIn: 'root',
})
export class SidebarLinksService {
  routes: ROUTES[] = [];

  constructor() {
    this.setRoutes('Admin');
    // role = 'SUPERVISOR', 'LABOUR', 'MANAGER', 'ADMIN'
  }

  setRoutes(role?: string) {
    switch (role) {
      case 'Admin': {
        this.routes = [
          {
            link: '/component1',
            name: 'ORGANIZATION',
            icon: 'custom_vector_white',
            icon_active: 'custom_vector_black',
          },
          {
            link: '/component2',
            name: 'HOME',
            icon: 'custom_home',
            icon_active: 'custom_home_black',
          },
          {
            link: '/component3',
            name: 'IRRIGATION',
            icon: 'custom_leaf',
            icon_active: 'custom_leaf_black',
          },
          {
            link: '/token-cast',
            name: 'DEVICES',
            icon: 'custom_mobile',
            icon_active: 'custom_mobile_black',
          },
        ];
        break;
      }

      // default: {
      //   this.routes = [];
      // }
    }
  }
}
