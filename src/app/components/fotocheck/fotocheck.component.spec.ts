import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotocheckComponent } from './fotocheck.component';

describe('FotocheckComponent', () => {
  let component: FotocheckComponent;
  let fixture: ComponentFixture<FotocheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FotocheckComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FotocheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
