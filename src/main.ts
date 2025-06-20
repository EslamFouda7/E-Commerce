import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { register } from 'swiper/element';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app/app.routes';

register();
bootstrapApplication(AppComponent, {
  ...appConfig, // ✅ تمرير إعدادات appConfig
  providers: [
    ...appConfig.providers, // ✅ تمرير جميع الـ providers من appConfig
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }) // ✅ التمرير لأعلى عند تغيير الصفحة
    )
  ]

}).catch((err) => console.error(err));
