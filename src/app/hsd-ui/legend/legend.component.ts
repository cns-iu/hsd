import {
  Component,
  OnInit,

  Output,
  EventEmitter
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { InfoDialogComponent } from '../../hsd-ui/info-dialog/info-dialog.component';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.sass']
})
export class LegendComponent implements OnInit {
  @Output() toggleLayout = new EventEmitter();

  summaryType = 'byLevel';
  colorField = 'concept';
  opacityField = 'visibility';

  isCompact = true;

  summaryTypes = [
    { value: 'cumulative', viewValue: 'Cumulative' },
    { value: 'byLevel', viewValue: 'By Level' },
  ];

  colorMappings = {
    'concept': [
      { label: 'Container', color: '#5B9BD5' },
      { label: 'Folder', color: '#70AD47' },
      { label: 'Leaf', color: '#FFC000' }
    ],
    'visibility': [
      { label: 'Active', color: '#5B9BD5' },
      { label: 'Hidden', color: '#70AD47' },
      { label: 'Inactive', color: '#FFC000' }
    ],
    'tableName': [
      { label: 'Concept', color: '#5B9BD5' },
      { label: 'Patient', color: '#70AD47' },
      { label: 'Visit', color: '#FFC000' },
      { label: 'Other', color: '#00ffff' }
    ],
    'isSynonym': [
      { label: 'Yes', color: '#00FF00' },
      { label: 'No', color: '#FF0000' }
    ],
    'hasMetaData': [
      { label: 'Yes', color: '#00FF00' },
      { label: 'No', color: '#FF0000' }
    ],
    'fixedColor': [
      { label: 'Fixed Color', color: '#5B9BD5' }
    ]
  };

  opacityMappings = {
    'concept': [
      { label: 'Container', color: 'rgba(91,155,213,1)' },
      { label: 'Folder', color: 'rgba(91,155,213,0.6)' },
      { label: 'Leaf', color: 'rgba(91,155,213,0.3)' }
    ],
    'visibility': [
      { label: 'Active', color: 'rgba(91,155,213,1)' },
      { label: 'Hidden', color: 'rgba(91,155,213,0.6)' },
      { label: 'Inactive', color: 'rgba(91,155,213,0.2)' }
    ],
    'tableName': [
      { label: 'Concept', color: 'rgba(91,155,213,1)' },
      { label: 'Patient', color: 'rgba(91,155,213,0.75)' },
      { label: 'Visit', color: 'rgba(91,155,213,0.5)' },
      { label: 'Other', color: 'rgba(91,155,213,0.2)' }
    ],
    'isSynonym': [
      { label: 'Yes', color: 'rgba(91,155,213,1)' },
      { label: 'No', color: 'rgba(91,155,213,0.5)' }
    ],
    'hasMetaData': [
      { label: 'Yes', color: 'rgba(91,155,213,1)' },
      { label: 'No', color: 'rgba(91,155,213,0.5)' }
    ],
    'fullyOpaque': [
      { label: 'Fully Opaque', color: '#5B9BD5' }
    ]
  };

  colorFields = [
    { value: 'fixedColor', viewValue: 'Fixed Color' },
    { value: 'concept', viewValue: 'Type' },
    { value: 'visibility', viewValue: 'Status' },
    { value: 'tableName', viewValue: 'Table' },
    { value: 'isSynonym', viewValue: 'Synonym' },
    { value: 'hasMetaData', viewValue: 'Metadata' }
  ];

  opacityFields = [
    { value: 'fullyOpaque', viewValue: 'Fully Opaque' },
    { value: 'concept', viewValue: 'Type' },
    { value: 'visibility', viewValue: 'Status' },
    { value: 'tableName', viewValue: 'Table' },
    { value: 'isSynonym', viewValue: 'Synonym' },
    { value: 'hasMetaData', viewValue: 'Metadata' }
  ];

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  /* This function opens a dialog on clicking on the info-icon in the legend */
  openSumTreeInfoDialog() {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      width: '750px'
    });
  }

  onLayoutToggle() {
    this.isCompact = !this.isCompact;
    this.toggleLayout.emit(this.isCompact);
  }
}
