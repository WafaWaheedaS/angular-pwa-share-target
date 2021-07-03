import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'angular-pwa-share-target';
  deferredPrompt: any;
  showButton = false;
  location = typeof window.location;
  showST: any; 

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e: { preventDefault: () => void }): void {
    console.log('Logging event captured:', e);
    e.preventDefault();
    this.deferredPrompt = e;
    this.showButton = true;
  }

  public ngOnInit(): void {
    window.addEventListener('DOMContentLoaded', () => {
      const parsedUrl = new URL(this.location);
      this.showST = parsedUrl.searchParams.get('title');
      // searchParams.get() will properly handle decoding the values.
      console.log('Title shared: ' + parsedUrl.searchParams.get('title'));
      console.log('Text shared: ' + parsedUrl.searchParams.get('text'));
      console.log('URL shared: ' + parsedUrl.searchParams.get('url'));
    });
  }

  addToHomeScreen(): void {
    this.showButton = false;
    this.deferredPrompt.prompt();
    this.deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
      this.deferredPrompt = null;
    });
  }
}
