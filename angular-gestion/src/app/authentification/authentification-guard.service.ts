import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../_services/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationGuardService implements CanActivate {

  constructor(private readonly router: Router, private readonly authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      // authorised so return true
      return true
    }
    // not logged in so redirect to login page with the return url

    /**
     * Si l'utilisateur n'est pas authentifié, l'auth guard le redirige également vers la route '/ login'
     * et inclut l'URL d'origine (précédente) dans le paramètre 'returnUrl'.
     * L'URL d'origine est accessible dans la protection d'authentification
     * via le paramètre 'state: RouterStateSnapshot' qui est transmis à la méthode canActivate ().*/

    this.router.navigate(['/auth/login'], {
      queryParams: {returnUrl: state.url},
    });
    return false
  }
}
