import { Injectable } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Injectable()
export class ColorService {
 constructor(private router: Router){}

   getActivatedRoute(path){
        if (this.router.url === path) {
            return 'selected';
        } else {
            return '$tastyGrey';
        }
   } 
}