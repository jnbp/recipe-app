import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewRecipesComponent } from './overview-recipes.component';

describe('OverviewRecipesComponent', () => {
  let component: OverviewRecipesComponent;
  let fixture: ComponentFixture<OverviewRecipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewRecipesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
