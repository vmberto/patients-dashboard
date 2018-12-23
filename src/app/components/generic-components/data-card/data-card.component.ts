import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-data-card',
  templateUrl: './data-card.component.html',
  styleUrls: ['./data-card.component.css']
})
export class DataCardComponent implements OnInit {

  @Input() cardTitle: string;
  @Input() cardIcon: string;
  @Input() cardData: any;
  @Input() routerLink: string;

  constructor() { }

  ngOnInit() {
  }

  public validateCardData(): boolean {
    return typeof this.cardData !== 'number';
  }

}
