/**
 * Title: app-routing.module.ts
 * Author: Group 1
 * Date: Nov 19 2023
 */

// imports statements
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { adminGuard } from './guards/admin.guard';
import { standardGuard } from './guards/standard.guard';
import { UserConfigurationComponent } from './user-configuration/user-configuration.component';
import { UserEditComponent } from './user-configuration/user-edit/user-edit.component';
import { UserCreateComponent } from './user-configuration/user-create/user-create.component';
import { FaqComponent } from './faq/faq.component';
import { EmployeeDirectoryComponent } from './employee-directory/employee-directory.component';
import { ServiceManagementComponent } from './service-management/service-management.component';
import { PurchasesGraphComponent } from './purchase-graph/purchase-graph.component';
import { CartComponent } from './cart/cart.component';

// routes array with a path, component, and title for each route in the application (e.g. home, about, contact, etc.)
const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        title: 'BCRS: Home' // title for the home page
      },
      {
        path: 'home',
        component: HomeComponent,
        title: 'BCRS: Home'
      },
      {
        // path for the security module (e.g. login, register, forgot password, etc.)
        path: 'security',
        loadChildren: () => import('./security/security.module').then(m => m.SecurityModule)
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'user-management',
        component: UserConfigurationComponent,
        canMatch: [adminGuard],
      },
      {
        path: 'user-management/create',
        component: UserCreateComponent,
        canMatch: [adminGuard],
      },
      {
        path: 'user-management/:userId',
        component: UserEditComponent,
        canMatch: [adminGuard],
      },
      {
        path: 'faq',
        component: FaqComponent,
        title: 'BCRS: FAQs'
      },
      {
        path: 'employee-directory',
        component: EmployeeDirectoryComponent,
        title: 'BCRS: Employee Directory'
      },
      {
        path:'service-management',
        component: ServiceManagementComponent,
        title: 'BCRS: Services'
      },
      {
        path: 'cart',
        component: CartComponent,
        title: 'BCRS: My Cart'
      },
      {
        path: 'purchase-graph',
        component: PurchasesGraphComponent,
        title: 'BCRS: Purchases Graph',
        canActivate: [adminGuard],
      },
      {
        path:'not-found',
        component: NotFoundComponent,
        title: 'BCRS: 404 Not Found'
      }
    ]
  },

  // this should catch any randomly wrong URL and redirect it to the 404 Page.
  {
    path: '**',
    redirectTo: 'not-found'
  },
];

@NgModule({
  // imports the RouterModule and defines the routes array and other options (e.g. useHash, enableTracing, scrollPositionRestoration)
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
