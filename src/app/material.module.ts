import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		MatToolbarModule,
		MatIconModule,
		FlexLayoutModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
		MatButtonModule,
	],
	exports: [
		MatToolbarModule,
		MatIconModule,
		FlexLayoutModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
		MatButtonModule,
	],
})
export class MaterialModule { }
