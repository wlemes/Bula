import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { categoriaComponent } from './consulta-categoria/consulta-categoria.component';
import { BugReportComponent } from './bug-report/bug-report.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//import { AlertModule } from 'ngx-alerts';
//import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from './pipes-module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FetchDataComponent,
    categoriaComponent,
    BugReportComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'consulta-categoria', component: categoriaComponent },
      { path: 'bug-report', component: BugReportComponent },
      /*{ path: 'fetch-data', component: FetchDataComponent },*/
    ]),
    BrowserAnimationsModule,
    PipesModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgxSpinnerModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
