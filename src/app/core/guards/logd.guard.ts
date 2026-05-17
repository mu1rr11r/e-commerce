import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const logdGuard: CanActivateFn = (route, state) => {

   const  _Router=inject(Router)


 if(localStorage.getItem('usertoken') !== null)
 {
    _Router.navigate(['/blank/home']);
    return false;
  }
  else{
    return true;
  }  
};
