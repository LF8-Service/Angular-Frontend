import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { AppModule } from './app/app.module';
import {provideHttpClient} from "@angular/common/http";
import {provideRouter} from "@angular/router";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
