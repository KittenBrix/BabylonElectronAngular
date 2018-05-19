import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuckBoxContainerComponent } from './duck-box-container.component';

describe('DuckBoxContainerComponent', () => {
  let component: DuckBoxContainerComponent;
  let fixture: ComponentFixture<DuckBoxContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuckBoxContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuckBoxContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
