
import express from 'express';
import morgan from 'morgan';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import vars from './vars.js'
import appRoutes from '../routes/index.js';
import path from 'path';
import { fileURLToPath } from 'url';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import i18nextMiddleware from 'i18next-http-middleware';

import hbs from 'hbs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

i18next.use(i18nextMiddleware.LanguageDetector).use(Backend).init({
  backend: {
    loadPath: __dirname + '/../resources/locales/{{lng}}/{{ns}}.json',
    addPath: __dirname + '/../resources/locales/{{lng}}/{{ns}}.missing.json'
  },
  lng: 'vi',
  debug: true,
  saveMissing: true,
  detection: {
    order: ['querystring', 'cookie'],
    caches: ['cookie']
  },
  fallbackLng: 'en',
  fallbackNS: 'translation',
  cleanCode: true,
  preload: ['en', 'vi']

});


hbs.registerHelper('t', function() {
  var args = Array.prototype.slice.call(arguments);
  var options = args.pop();
  return i18next.t(args, { lng: options.data.root._locals.language });
});

hbs.registerHelper('tr', function(context, options) {
  var opts = i18next.functions.extend(options.hash, context);
  if (options.fn) opts.defaultValue = options.fn(context);

  var result = i18next.t(opts.key, opts);

  return new hbs.SafeString(result);
});


const app = express();

app.use(i18nextMiddleware.handle(i18next, {
  ignoreRoutes: ['favicon.ico', 'css/', 'js/', 'images/', 'assets/', 'vendors/', 'fonts/'],
  removeLngFromUrl: true
}));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'hbs');

app.use(morgan(vars.logs));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(compress());

app.use(helmet());

app.use(cors());

app.use('/', appRoutes);

export default app;
