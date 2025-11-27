import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { ICalinescu } from '../../../model/calinescu';
import { TrimPipe } from "../../../pipe/trim-pipe";
import { DatetimePipe } from "../../../pipe/datetime-pipe";

@Component({
  selector: 'app-unrouted-user-view2-calinescu',
  imports: [TrimPipe, RouterLink, DatetimePipe, DecimalPipe],
  templateUrl: './unrouted-user-view2.html',
  styleUrl: './unrouted-user-view2.css',
})
export class UnroutedUserView2Calinescu implements OnInit {
  @Input() oCalinescu: ICalinescu | null = null;

  iconClass: string = 'bi bi-cart-check';

  ngOnInit(): void {
    const icons: string[] = [
      'bi bi-cart-check',
      'bi bi-bag',
      'bi bi-basket',
      'bi bi-cart',
      'bi bi-list-check',
      'bi bi-clipboard-check',
    ];
    this.iconClass = icons[Math.floor(Math.random() * icons.length)];
  }

}
