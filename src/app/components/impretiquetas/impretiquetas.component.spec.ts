import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpretiquetasComponent } from './impretiquetas.component';

describe('ImpretiquetasComponent', () => {
  let component: ImpretiquetasComponent;
  let fixture: ComponentFixture<ImpretiquetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImpretiquetasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImpretiquetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
