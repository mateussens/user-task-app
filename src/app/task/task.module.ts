import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {TaskComponent} from "./task.component";
import {TaskService} from "./task.service";
import {TaskTemplateComponent} from "./parts/user/task.template.component";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {CommonModule} from "@angular/common";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";


const routes = [
  {
    path: 'task',
    component: TaskComponent
  }
];

@NgModule({
  declarations: [
    TaskComponent,
    TaskTemplateComponent
  ],
  entryComponents: [
    TaskTemplateComponent
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
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatAutocompleteModule
  ],
  providers: [TaskService],
  exports: [
    TaskComponent,
    CommonModule
  ]
})

export class TaskModule {
}
