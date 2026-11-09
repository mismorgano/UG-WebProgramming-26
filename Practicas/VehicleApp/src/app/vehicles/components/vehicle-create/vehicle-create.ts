import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { ICarBrand } from '../../models/ICarBrand';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-vehicle-create',
  styleUrl: './vehicle-create.scss',
  templateUrl: './vehicle-create.html',
})
export class VehicleCreate implements OnInit{
  private form = inject(FormBuilder);
  private brands = signal<ICarBrand[]>([]);

  carForm = this.form.group({
    year: [''],
    model: [''],
    brandId: [0]
  })


  private readonly urlCarBrands = 'https://localhost:7221/api/catalogs';
  private readonly http = inject(HttpClient);

  ngOnInit(): void {

  }

  getBrands() {
    return this.http.get<ICarBrand[]>(this.urlCarBrands);
  }
}
