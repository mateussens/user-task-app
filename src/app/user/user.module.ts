import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {UserComponent} from "./user.component";
import {UserService} from "./user.service";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import {UserTemplateComponent} from "./parts/user/user.template.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {CommonModule} from "@angular/common";


const routes = [
  {
    path: 'user',
    component: UserComponent
  }
];

@NgModule({
  declarations: [
    UserComponent,
    UserTemplateComponent
  ],
  entryComponents: [
    UserTemplateComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [UserService],
  exports: [
    UserComponent,
  ]
})

export class UserModule {
}
