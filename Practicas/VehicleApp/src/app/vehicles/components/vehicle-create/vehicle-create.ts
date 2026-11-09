import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule} from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-vehicle-create',
  styleUrl: './vehicle-create.scss',
  templateUrl: './vehicle-create.html',
})
export class VehicleCreate {
  private form = inject(FormBuilder);

  carForm = this.form.group({
    year: [''],
    model: [''],
    brandId: [0]
  })
}
