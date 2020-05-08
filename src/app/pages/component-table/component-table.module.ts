import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ComponentTablePageComponent } from "./component-table-page/component-table-page.component";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

const routes: Routes = [{ path: "", component: ComponentTablePageComponent }];

/**
 * Separate module with lazy loading
 */
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), NgxDatatableModule],
  declarations: [ComponentTablePageComponent]
})
export class ComponentTableModule {}
