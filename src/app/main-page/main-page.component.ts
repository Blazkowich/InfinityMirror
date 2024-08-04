import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'main-page',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('ge');

    this.translate.use('ge');
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}
