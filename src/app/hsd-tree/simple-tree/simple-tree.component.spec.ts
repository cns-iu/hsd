import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTreeComponent } from './simple-tree.component';

describe('SimpleTreeComponent', () => {
  let component: SimpleTreeComponent;
  let fixture: ComponentFixture<SimpleTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
