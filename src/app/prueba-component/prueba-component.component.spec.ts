import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaComponentComponent } from './prueba-component.component';

describe('PruebaComponentComponent', () => {
  let component: PruebaComponentComponent;
  let fixture: ComponentFixture<PruebaComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PruebaComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PruebaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
