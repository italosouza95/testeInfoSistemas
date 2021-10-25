import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component'; 
import { CadastroEdicaoComponent } from './components/cadastro/cadastroEdicao.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListarComponent } from './components/listar/listar.component';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent, 
    CadastroEdicaoComponent,
    ListarComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
