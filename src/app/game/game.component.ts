import {Component, HostListener, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgStyle} from "@angular/common";

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    standalone: true,
    imports: [
        NgStyle,
        NgForOf,
        NgIf
    ],
    styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
    playerX: number = 375;
    playerY: number = 550;
    bullets: { x: number; y: number; style: any }[] = [];
    invaders: { x: number; y: number; style: any }[] = [];
    gameOver: boolean = false;

    ngOnInit(): void {
        this.initInvaders();
        this.moveInvaders();
    }

    get playerStyle() {
        return {
            left: `${this.playerX}px`,
            top: `${this.playerY}px`
        };
    }

    initInvaders() {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                this.invaders.push({
                    x: 50 + 70 * j,
                    y: 50 * i,
                    style: {
                        left: `${50 + 70 * j}px`,
                        top: `${50 * i}px`
                    }
                });
            }
        }
    }

    moveInvaders() {
        let invaderDirection = 1;

        const interval = setInterval(() => {
            if (this.gameOver) {
                clearInterval(interval);
                return;
            }

            let reachedEdge = false;

            this.invaders.forEach((invader, index) => {
                if (invader.y + 40 >= this.playerY) {
                    this.gameOver = true;
                }
                if (invader.x >= 750 || invader.x <= 0) {
                    reachedEdge = true;
                }
            });

            if (reachedEdge) {
                invaderDirection *= -1;
                this.invaders.forEach(invader => {
                    invader.y += 50;
                    invader.style.top = `${invader.y}px`;
                });
            }

            this.invaders.forEach(invader => {
                invader.x += 20 * invaderDirection;
                invader.style.left = `${invader.x}px`;
            });

        }, 90);
    }


    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.key === 'ArrowLeft' && this.playerX > 0) {
            this.playerX -= 15;
        } else if (event.key === 'ArrowRight' && this.playerX < 750) {
            this.playerX += 15;
        } else if (event.key === ' ') {
            this.shoot();
        }
    }

    shoot() {
        this.bullets.push({
            x: this.playerX + 22,
            y: this.playerY - 20,
            style: {
                left: `${this.playerX + 22}px`,
                top: `${this.playerY - 20}px`
            }
        });
        this.moveBullets();
    }

    moveBullets() {
        const interval = setInterval(() => {
            this.bullets.forEach(bullet => {
                bullet.y -= 10;
                bullet.style.top = `${bullet.y}px`;

                this.invaders.forEach((invader, invaderIndex) => {
                    if (this.checkCollision(bullet, invader)) {
                        this.invaders.splice(invaderIndex, 1);
                        this.bullets.splice(this.bullets.indexOf(bullet), 1);
                    }
                });

                if (bullet.y < 0) {
                    this.bullets.splice(this.bullets.indexOf(bullet), 1);
                }
            });
        }, 100);

        if (this.gameOver) {
            clearInterval(interval);
        }
    }

    checkCollision(bullet: { x: number; y: number; style: any }, invader: {
        x: number;
        y: number;
        style: any
    }): boolean {
        return bullet.x > invader.x && bullet.x < invader.x + 40 &&
            bullet.y > invader.y && bullet.y < invader.y + 40;
    }

    restartGame() {
        this.gameOver = false;
        this.invaders = [];
        this.bullets = [];
        this.initInvaders();
        this.moveInvaders();
    }
}
