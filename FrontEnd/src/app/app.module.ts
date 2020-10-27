import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { RealTimeComponent } from './realTime.component';
import { ComponentNameComponent } from './component-name/component-name.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    RealTimeComponent,
    ComponentNameComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule      
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
