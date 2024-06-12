import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {GameComponent} from './app/game/game.component';
import {importProvidersFrom} from "@angular/core";
import {CommonModule} from "@angular/common";


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom([
            BrowserModule,
            CommonModule
        ])
    ]
}).catch(err => console.error(err));
