import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@auth/services/auth-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);

  const token = authService.token();

  const newReq = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${token}`)
  })

  return next(newReq);
};
