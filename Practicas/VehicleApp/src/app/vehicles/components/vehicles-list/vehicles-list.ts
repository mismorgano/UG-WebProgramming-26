import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { IVehicle } from '../../models/IVehicle';
import { Observable } from 'rxjs';
import { VehicleEdit } from '../vehicle-edit/vehicle-edit';

@Component({
  imports: [VehicleEdit],
  selector: 'app-vehicles-list',
  styleUrl: './vehicles-list.scss',
  templateUrl: './vehicles-list.html',
})
export class VehiclesList implements OnInit {
  private httpClient = inject(HttpClient);

  vehicleList = signal<IVehicle[]>([]);

  private url = 'https://localhost:7221/api/vehicles';

  editComponent = signal<boolean>(false);
  vehicleIdList = signal<number>(0);

  ngOnInit(): void {
    this.getVehicles().subscribe((vehicles) => {
      this.vehicleList.set(vehicles);
    });
  }

  getVehicles(): Observable<IVehicle[]> {
    return this.httpClient.get<IVehicle[]>(this.url);
  }

  deleteVehicle(id: number): void {
    this.httpClient.delete(`${this.url}/${id}`).subscribe(() => {
      // Update vehicles list after delete a except of the one deleted
      // this update the vehicleList without consulting the database
      this.vehicleList.set(this.vehicleList().filter((vehicle) => vehicle.id != id));
      // But we should update vehicleList from the database after delete, so the following code
      // this.getVehicles().subscribe((vehicles) => {
      //   this.vehicleList.set(vehicles);
      // });
    });
  }

  editVehicle(id: number): void {
    console.log(id);
    this.vehicleIdList.set(id);
    this.editComponent.set(true);

    this.getVehicles().subscribe((vehicles) => {
      this.vehicleList.set(vehicles);
    });
  }
}
