import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ICarBrand } from '../../models/ICarBrand';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-vehicle-create',
  styleUrl: './vehicle-create.scss',
  templateUrl: './vehicle-create.html',
})
export class VehicleCreate implements OnInit {
  private form = inject(FormBuilder);
  private brands = signal<ICarBrand[]>([]);

  carForm = this.form.group({
    year: [''],
    model: [''],
    brandId: [0],
  });

  newVehicle = signal<NewVehicle>({
    year: '',
    model: '',
    carBrandId: 0,
  });

  private readonly urlCarBrands = 'https://localhost:7221/api/catalogs';
  private readonly urlSaveVehicle = 'https://localhost:7221/api/vehicles';
  private readonly http = inject(HttpClient);

  ngOnInit(): void {
    this.getBrands().subscribe({
      next: (brands) => {
        this.brands.set(brands);
        console.log(this.brands());
      },
      error: (error) => {
        // maybe ww should show a post or a error page
        console.error('Error to retrieve the brands', error);
      },
    });
  }

  getBrands() {
    return this.http.get<ICarBrand[]>(this.urlCarBrands);
  }

  saveVehicle() {
    const formValues = this.carForm.getRawValue();


    this.newVehicle.set({
      ...formValues,
      carBrandId: formValues.brandId ? Number(formValues.brandId) : 0,
    });

    console.log(this.newVehicle());

    this.http.post(this.urlSaveVehicle, this.newVehicle()).subscribe({
      next: (response) => {
        console.log('Vehicle saved successfully: ', response);
      },
      error: (error) => {
        console.error('Error when saving vehicle: ', error);
      }
    })
  }
}

export interface NewVehicle {
  year: string | null;
  model: string | null;
  carBrandId: number | null;
}
