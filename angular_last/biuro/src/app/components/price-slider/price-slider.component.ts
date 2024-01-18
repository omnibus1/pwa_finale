import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-price-slider',
  templateUrl: './price-slider.component.html',
  styleUrls: ['./price-slider.component.css'],
})
export class PriceSliderComponent implements OnInit {
  @Input()minValue:number
  @Input()maxValue = 100;
  stepValue = 1;
  selectedLower=""
  selectedUpper=""
  @Output() valueChange = new EventEmitter<String[]>
  constructor() {}

  ngOnInit(): void {}

  change(){
    console.log(this.selectedLower, this.selectedUpper)
    this.valueChange.emit([this.selectedLower, this.selectedUpper])
  }
  
}