import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { StudinfoComponent } from './studinfo/studinfo.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTableModule } from 'ng-zorro-antd/table';
import { SexReformPipe } from './sex-reform.pipe';
import { ScholarReformPipe } from './scholar-reform.pipe';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { TestpageComponent } from './testpage/testpage.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AddstudentComponent } from './studinfo/addstudent/addstudent.component';

import { GenderPipe } from './studinfo/gender.pipe';
import { ScholarPipe } from './studinfo/scholar.pipe';


registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    StudinfoComponent,

    SexReformPipe,
    ScholarReformPipe,
    TestpageComponent,
    
    AddstudentComponent,
    GenderPipe,
    ScholarPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzRadioModule,
    NzDatePickerModule,
    NzModalModule,
    NzPaginationModule,
    NzTableModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,

    
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
