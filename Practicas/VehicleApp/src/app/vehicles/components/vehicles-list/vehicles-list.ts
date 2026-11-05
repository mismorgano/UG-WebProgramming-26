import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { IVehicle } from '../../models/IVehicle';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  imports: [AsyncPipe],
  selector: 'app-vehicles-list',
  styleUrl: './vehicles-list.scss',
  templateUrl: './vehicles-list.html',
})
export class VehiclesList implements OnInit {

  private httpClient = inject(HttpClient);

  vehiclesList = signal<IVehicle[]>([]);

  private url = 'https://localhost:3000';

  ngOnInit(): void {
    this.getVehicles().subscribe((vehicle) => {
      this.vehiclesList.set(vehicle);
    })
  }


  getVehicles(): Observable<IVehicle[]> {
    return this.httpClient.get<IVehicle[]>(this.url);
  }
}
