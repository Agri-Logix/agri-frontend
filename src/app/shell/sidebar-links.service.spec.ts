import { TestBed } from '@angular/core/testing';

import { SidebarLinksService } from './sidebar-links.service';

describe('SidebarLinksService', () => {
  let service: SidebarLinksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidebarLinksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
