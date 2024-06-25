import 'zone.js/node';
import { APP_BASE_HREF } from '@angular/common';
import { join } from 'path';
import express from 'express';
import { renderApplication, provideServerRendering } from '@angular/platform-server';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './src/app/app.component';
import { config } from './src/app/app.config.server';

const DIST_FOLDER = join(process.cwd(), 'dist/titan-estates/browser');
const app = express();

const domino = require('domino');
const fs = require('fs');
const path = require('path');

const template = fs.readFileSync(path.join(DIST_FOLDER, 'index.html')).toString();
const win = domino.createWindow(template);

global['window'] = win;
global['document'] = win.document;
global['branch'] = null;
global['object'] = win.object;
global['HTMLElement'] = win.HTMLElement;
global['navigator'] = win.navigator;
global['localStorage'] = win.localStorage;
global['Event'] = win.Event;
global['Event']['prototype'] = win.Event.prototype;

app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y'
}));

app.engine('html', (_, options: any, callback) => {
  renderApplication(() => bootstrapApplication(AppComponent, {
    providers: [
      { provide: APP_BASE_HREF, useValue: options.req.baseUrl },
      provideServerRendering(),
      ...config.providers
    ]
  }), {
    document: template,
    url: options.req.url,
  }).then(html => callback(null, html)).catch(callback);
});

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

app.get('*', (req, res) => {
  res.render('index', { req });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
