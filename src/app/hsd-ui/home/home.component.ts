import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  private defaultSidenavWidth = '260px';
  private compactSidenavWidth= '200px';

  private defaultToolbarHeight = '70px';
  private compactToolbarHeight = '35px';

  private defaultLogoHeight = '52px';
  private defaultLogoWidth = '132.34px';

  private compactLogoHeight = '30px';
  private compactLogoWidth = '70px';

  private defaultToolbarTextSize = '22px';
  private compactToolbarTextSize = '15px';

  private logoWidth = this.defaultLogoWidth;
  private logoHeight = this.defaultLogoHeight;
  private sidenavWidth = this.defaultSidenavWidth;
  private toolbarHeight = this.defaultToolbarHeight;
  private toolbarTextSize = this.defaultToolbarTextSize;

  private isCompact = true;

  constructor() { }

  ngOnInit() {
    this.toggleLayout(this.isCompact); // default setting
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
