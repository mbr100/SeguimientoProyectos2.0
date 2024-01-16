import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarconsultorfnComponent } from './mostrarconsultorfn.component';

describe('MostrarconsultorfnComponent', () => {
  let component: MostrarconsultorfnComponent;
  let fixture: ComponentFixture<MostrarconsultorfnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarconsultorfnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarconsultorfnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
