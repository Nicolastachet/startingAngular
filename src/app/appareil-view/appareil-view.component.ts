import { Component, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit {

  appareils: any[];
  appareilSubscription: Subscription;
  isAuth = false;

  lastUpdate = new Promise((resolve, reject) => {
    const date = new Date();
    setTimeout(
      () => {
        resolve(date);
      }, 2000
    );
  });

  constructor(private appareilService: AppareilService) { }

  ngOnInit() {
   this.appareilSubscription = this.appareilService.appareilsSubject.subscribe(
     (appareils: any[]) => {
       this.appareils = appareils;
     }
   );
   this.appareilService.emitAppareilSubject();
   this.appareilService.getAppareilsFromServer();
 }

 onAllumer() {
   this.appareilService.switchOnAll();
 }

 onEteindre() {
   if(confirm('Etes-vous sûr de vouloir éteindre tous vos appareils ?')) {
     this.appareilService.switchOffAll();
   } else {
     return null;
   }
 }
 onSave() {
     this.appareilService.saveAppareilsToServer();
 }

 onFetch() {
    this.appareilService.getAppareilsFromServer();
}

 ngOnDestroy() {
   this.appareilSubscription.unsubscribe();
 }

}
