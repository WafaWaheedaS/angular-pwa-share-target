import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-pwa-share-target';
  deferredPrompt: any;
  showButton = false;

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e: { preventDefault: () => void }): void {
    console.log('Logging event captured:', e);
    e.preventDefault();
    this.deferredPrompt = e;
    this.showButton = true;
  }

  addToHomeScreen(): void {
    this.showButton = false;
    this.deferredPrompt.prompt();
    this.deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
      this.deferredPrompt = null;
    });
  }
}
