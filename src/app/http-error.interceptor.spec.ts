import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpErrorInterceptor } from './http-error.interceptor';

describe('HttpErrorInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');  // Spy on the navigate method
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const interceptor = TestBed.inject(HTTP_INTERCEPTORS).find(
      (interceptor: any) => interceptor instanceof HttpErrorInterceptor
    );
    expect(interceptor).toBeTruthy();
  });

  it('should redirect to /not-found on 404 error', () => {
    httpClient.get('/test-url').subscribe(
      response => fail('should have failed with 404 error'),
      error => {
        expect(error).toBeTruthy();
        expect(router.navigate).toHaveBeenCalledWith(['/not-found']);
      }
    );

    const req = httpMock.expectOne('/test-url');
    req.flush('404 error', { status: 404, statusText: 'Not Found' });
  });

  it('should propagate non-404 errors', () => {
    const errorMessage = 'Server error';

    httpClient.get('/test-url').subscribe(
      response => fail('should have failed with 500 error'),
      error => {
        expect(error).toBeTruthy();
        expect(router.navigate).not.toHaveBeenCalled();
        expect(error.message).toBe(errorMessage);
      }
    );

    const req = httpMock.expectOne('/test-url');
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });
});
