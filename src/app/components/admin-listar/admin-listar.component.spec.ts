import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListarComponent } from './admin-listar.component';

describe('AdminListarComponent', () => {
  let component: AdminListarComponent;
  let fixture: ComponentFixture<AdminListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminListarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
