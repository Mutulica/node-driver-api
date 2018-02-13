import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatMenuModule } from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [MatMenuModule, MatSelectModule, MatToolbarModule, MatButtonModule],
  exports: [MatMenuModule, MatSelectModule, MatToolbarModule, MatButtonModule],
})
export class HomeMaterialModule { }
