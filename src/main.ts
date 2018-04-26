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
	ViewChild
	Observables 
	static methods
	RxJS extensions
	Typescript cool features
	ECMA 6

	Implement:  searching, delete line item


	My best way to learn is a lot like my daily work:  Jump into the middle of a project, read a lot of code, do research,
	start by updating or adding new features to existing project.  Then, after doing this for a while, start a new project.
	Absorb like a sponge
	What would Eddie say about this, Michael, Derrek?   What would Scott or Derrek do here?

	https://angular.io/api/core/ViewChild
	http://bootstrap-growl.remabledesigns.com/
	https://angular.io/guide/observables
	https://angular.io/guide/comparing-observables
	https://toddmotto.com/rxjs-observables-observers-operators
	https://codecraft.tv/courses/angular/components/lifecycle-hooks/
	http://reactivex.io/rxjs/manual/overview.html#instance-operators-versus-static-operators
	

*/