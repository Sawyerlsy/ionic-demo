import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Shop } from 'src/app/shared/model/shop';
import { AuthService } from '../services/auth.service';


@Injectable({
    providedIn: 'root'
})
export class ShopResolve implements Resolve<Shop> {

    constructor(private authService: AuthService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Shop | Observable<Shop> | Promise<Shop> {
        return this.authService.getCurrentShop();
    }
}