import { Routes } from '@angular/router';
import { VehiclesList } from './vehicles/components/vehicles-list/vehicles-list';
import { VehicleCreate } from './vehicles/components/vehicle-create/vehicle-create';

export const routes: Routes = [
  {
    path: 'vehicles-list',
    component: VehiclesList,
  },
  {
    path: 'vehicles-create',
    component: VehicleCreate,
  },
];
