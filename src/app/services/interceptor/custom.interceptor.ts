import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const authdata = sessionStorage.getItem('authdata') || '';

  if (authdata) {
    const headers = req.headers.set('Authorization', `Basic ${authdata}`);

    const request = req.clone({ headers });

    console.log('Headers set in interceptor:', headers);
    return next(request);
  }
  return next(req);
};
