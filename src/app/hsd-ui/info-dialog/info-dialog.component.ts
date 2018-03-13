import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

export interface Element {
  name: string;
  description: string;
}

const ELEMENT_DATA: Element[] = [
  {
    name: 'Concept',
    description: `Facts are defined by concept codes and
    the hierarchical structure of these codes together with their descriptive
    terms and some other information forms the i2b2 ontology.`
  },
  { name: 'Summary Type',
    description: `The type of method in which the multiple
    concept nodes are aggregated -
    1) By Level - Multiple Concept Node numbers aggregated by their level of heirarchy in the ontology.
    2) Cumulative - Multiple Concept Nodes numbers aggregated by levels equal to and greater than their level of heirarchy in the ontology.`
  },
  { name: 'Color and Opacity', description: `Color and Opacity encodings on the visualization nodes.
  Options available are -  1) Concept - Encoding by concept types (Default).
  2) Visibility - Encoding by node concept visibility types.
  3) Table Name - Encoding by Ontology table names.
  4) Synonym - Encoding by if a node is a synonym of another node or not.
  5) Has XML Meta Data - Encoding by if a node has XML metadata associated with the concept. ` }
];

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.sass']
})

export class InfoDialogComponent implements OnInit {
  displayedColumns = ['name', 'description'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(public dialogRef: MatDialogRef<InfoDialogComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
