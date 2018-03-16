import {
  Component, Input, Output,
  OnInit,
  EventEmitter
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {  } from '../shared/lifecycle-hooks';

@Component({
  selector: 'app-signal',
  templateUrl: './signal.component.html',
  styleUrls: ['./signal.component.sass']
})
export class SignalComponent implements OnInit {
  private instance: any; // Vega instance
  private readonly handler: (name: string, value: any) => void;

  @Input() name: string;
  @Input() initial: any = undefined;
  @Input() update: any = undefined;
  @Output() listener = new EventEmitter<any>();

  constructor() {
    // TODO set handler
  }

  ngOnInit() {
  }
}
