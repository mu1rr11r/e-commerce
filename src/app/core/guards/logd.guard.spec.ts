import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { logdGuard } from './logd.guard';

describe('logdGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => logdGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
