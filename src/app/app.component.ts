import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {GameComponent} from "./game/game.component";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, GameComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: true,
})
export class AppComponent {
    title = 'SpaceInvaders';
}
