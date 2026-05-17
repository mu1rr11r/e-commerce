import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

   const  _Router=inject(Router)

if(typeof localStorage !== 'undefined') {
  
  if(localStorage.getItem('usertoken') !== null)
 {
  return true;
 }
  else{
    _Router.navigate(['/auth/login']);
    return false;
  }
}
else{
  return false;
}
};
