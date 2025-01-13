import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemasVersionesComponent } from './sistemas-versiones.component';

describe('SistemasVersionesComponent', () => {
  let component: SistemasVersionesComponent;
  let fixture: ComponentFixture<SistemasVersionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SistemasVersionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SistemasVersionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
