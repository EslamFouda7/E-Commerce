import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService  , NgxSpinnerModule} from 'ngx-spinner';

import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(NgxSpinnerService);
  spinner.show();
  return next(req).pipe(
    finalize(() => {setTimeout(()=>{
      spinner.hide()
    },500)}));
};

