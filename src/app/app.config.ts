import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { BrowserModule } from '@angular/platform-browser';


export const appConfig: ApplicationConfig = {
  providers: [ provideHttpClient(withFetch()),provideRouter(routes), BrowserModule, MessageService,importProvidersFrom([BrowserAnimationsModule , ToastModule ])]
};
