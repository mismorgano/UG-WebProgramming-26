import { HttpClient } from '@angular/common/http';
import { Component, input, OnInit, signal } from '@angular/core';
import { inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ICarBrand } from '../../models/ICarBrand';
import { NewVehicle } from '../vehicle-create/vehicle-create';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-vehicle-edit',
  styleUrl: './vehicle-edit.scss',
  templateUrl: './vehicle-edit.html',
})
export class VehicleEdit implements OnInit {
  private form = inject(FormBuilder);
  private readonly urlCarBrands = 'https://localhost:7221/api/catalogs';
  private readonly urlSaveVehicle = 'https://localhost:7221/api/vehicles';

  vehicleId = input.required<number>();

  private readonly http = inject(HttpClient);

  brands = signal<ICarBrand[]>([]);
  newVehicle = signal<NewVehicle>({
    year: '',
    model: '',
    carBrandId: 0,
  });

  editCarForm = this.form.group({
    year: [''],
    model: [''],
    carBrandId: [0],
  });

  ngOnInit(): void {
    this.getBrands().subscribe({
      next: (brands) => {
        this.brands.set(brands);
      },
      error: (error) => {
        console.error('Error retrieving the brands: ', error);
      },
    });
  }

  getBrands() {
    return this.http.get<ICarBrand[]>(this.urlCarBrands);
  }

  editVehicle() {
    const formValues = this.editCarForm.getRawValue();

    this.newVehicle.set({
      ...formValues,
      carBrandId: formValues.carBrandId ? Number(formValues.carBrandId) : 0,
    });

    this.http.put(`${this.urlSaveVehicle}/${this.newVehicle}`, this.newVehicle()).subscribe({
      next: (response) => {
        console.log('Vehicle successfully saved: ', response);
      },
      error: (error) => {
        console.error('Error updating the vehicle:', error);
      },
    });
  }
}
