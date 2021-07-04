import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}


  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e: { preventDefault: () => void }): void {
    console.log('Logging event captured:', e);
    e.preventDefault();
    this.deferredPrompt = e;
    this.showButton = true;
  }

  public ngOnInit(): void {
    window.addEventListener('DOMContentLoaded', () => {
      const parsedUrl = this.activatedRoute;
      console.log(parsedUrl)
      console.log(this.router.url)
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
