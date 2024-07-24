import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  // Retrieve credentials from sessionStorage
  const authdata = sessionStorage.getItem('authdata') || '';

  // Check if authdata is present
  if (authdata) {
    const headers = req.headers.set('Authorization', `Basic ${authdata}`);

    const request = req.clone({ headers });

    console.log('Headers set in interceptor:', headers);
    return next(request);
  }

  // If no credentials, pass the request as is
  return next(req);
};
