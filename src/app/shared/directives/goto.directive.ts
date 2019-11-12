import { Directive, HostListener, Input } from '@angular/core';
import { NavController } from '@ionic/angular';

@Directive({
  selector: '[appGoTo]'
})
export class GoToDirective {

  @Input()
  appGoTo = 'back';

  constructor(private navController: NavController) { }

  @HostListener('tap', ['$event.target'])
  handleTap(ev) {
    switch (this.appGoTo) {
      case 'home':
        this.navController.navigateRoot(['']);
        break;
      case 'close':
        this.navController.pop();
        break;
      case 'back':
        this.navController.back();
        break;
      case 'scan':
        // this.navController.navigateRoot(['scan'], { animated: false });
        this.navController.navigateRoot(['scan']);
        break;
      default:
        this.navController.back();
        break;
    }
  }
}
