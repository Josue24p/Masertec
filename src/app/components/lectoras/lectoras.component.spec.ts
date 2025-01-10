import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LectorasComponent } from './lectoras.component';

describe('LectorasComponent', () => {
  let component: LectorasComponent;
  let fixture: ComponentFixture<LectorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LectorasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LectorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
