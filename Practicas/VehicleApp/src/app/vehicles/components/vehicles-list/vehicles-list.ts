import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { IVehicle } from '../../models/IVehicle';
import { Observable } from 'rxjs';


@Component({
  imports: [],
  selector: 'app-vehicles-list',
  styleUrl: './vehicles-list.scss',
  templateUrl: './vehicles-list.html',
})
export class VehiclesList implements OnInit {

  private httpClient = inject(HttpClient);

  vehicleList = signal<IVehicle[]>([]);

  private url = 'https://localhost:7221/api/vehicles';

  ngOnInit(): void {
    this.getVehicles().subscribe((vehicles) => {
      this.vehicleList.set(vehicles);
    });
  }


  getVehicles(): Observable<IVehicle[]> {
    return this.httpClient.get<IVehicle[]>(this.url);
  }
}
