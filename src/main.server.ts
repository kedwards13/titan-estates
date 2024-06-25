import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment'; //mispell in enviroments wont debug other way though
import { bootstrapApplication } from '@angular/platform-browser';
import { provideServerRendering } from '@angular/platform-server';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

if (environment.production) {
  enableProdMode();
}

const bootstrap = async () => {
  const appRef = await bootstrapApplication(AppComponent, {
    providers: [
      provideServerRendering(),
      ...config.providers
    ]
  });

  return appRef;
};

export default bootstrap;
