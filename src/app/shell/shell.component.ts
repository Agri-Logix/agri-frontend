import { Title } from '@angular/platform-browser';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MediaObserver } from '@angular/flex-layout';
import { SidebarLinksService } from './sidebar-links.service';
import { AuthenticationService, CredentialsService } from '@app/auth';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  number: number = 0;
  previewUrl: any;

  routes: import('./sidebar-links.service').ROUTES[];
  constructor(
    private router: Router,
    private titleService: Title,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private media: MediaObserver,
    public linksService: SidebarLinksService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.setRole();
  }

  ngOnInit() {
    window.addEventListener('scroll', this.scrollEvent, true);
  }

  // add bottom shadow on sticky breadcrumb on scroll
  scrollEvent = (event: any): void => {
    this.number = this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
  };
  async setRole() {
    this.routes = await this.linksService.routes;
    console.log(this.routes, '1');
  }
  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.username : null;
  }

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }

  get title(): string {
    return this.titleService.getTitle();
  }
}
