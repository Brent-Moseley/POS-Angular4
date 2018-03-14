import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

/*
	Angular Techniques to apply to this demo project:
	Tree structure of components, data flow across components, pub sub
	Value binding
	Property binding
	New form event handling
	Two-way binding
	Use of structural and attribute directives
	Series of services that provide functionality to the app
	Use of promises and services that simulate connecting to an external api 
	(CRUD operations, but just using local storage for this demo).
	Use of DI
	Animations, state transitions
	Lifecycle hooks
	Reactive forms
	Angular material
	NG Bootstrap
	Template driven forms
*/