import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  defaultSidenavWidth = '260px';
  compactSidenavWidth= '200px';

  defaultToolbarHeight = '70px';
  compactToolbarHeight = '35px';

  defaultLogoHeight = '52px';
  defaultLogoWidth = '132.34px';

  compactLogoHeight = '30px';
  compactLogoWidth = '70px';

  defaultToolbarTextSize = '22px';
  compactToolbarTextSize = '15px';

  logoWidth = this.defaultLogoWidth;
  logoHeight = this.defaultLogoHeight;
  sidenavWidth = this.defaultSidenavWidth;
  toolbarHeight = this.defaultToolbarHeight;
  toolbarTextSize = this.defaultToolbarTextSize;

  isCompact = true;

  autoresize = true;

  width = 950; // client defined width when autoresize is false
  height = 2500; // client defined when autoresize is false

  constructor() { }

  ngOnInit() {
    this.toggleLayout(this.isCompact); // default setting - client defined
  }

  toggleLayout(isCompact: boolean) {
    this.isCompact = isCompact;
    switch (isCompact) {
      default:
      case false:
        this.sidenavWidth = this.defaultSidenavWidth;

        this.toolbarHeight = this.defaultToolbarHeight;

        this.logoHeight = this.defaultLogoHeight;
        this.logoWidth = this.defaultLogoWidth;

        this.toolbarTextSize = this.defaultToolbarTextSize;
        break;

      case true :
        this.sidenavWidth = this.compactSidenavWidth;

        this.toolbarHeight = this.compactToolbarHeight;

        this.logoHeight = this.compactLogoHeight;
        this.logoWidth = this.compactLogoWidth;

        this.toolbarTextSize = this.compactToolbarTextSize;
        break;
    }
  }

}
