import { TestBed, async, inject } from '@angular/core/testing';

import { NotauthenticatedGuard } from './notauthenticated.guard';

describe('NotauthenticatedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotauthenticatedGuard]
    });
  });

  it('should ...', inject([NotauthenticatedGuard], (guard: NotauthenticatedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
