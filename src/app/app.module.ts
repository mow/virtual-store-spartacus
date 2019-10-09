
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatExpansionModule, MatIconModule, MatInputModule, MatRadioModule, MatSelectModule } from '@angular/material';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { translationChunksConfig, translations } from '@spartacus/assets';
import { I18nModule, UrlModule } from '@spartacus/core';
import { B2cStorefrontModule, SpinnerModule } from '@spartacus/storefront';
import { NgxMaskModule } from 'ngx-mask';
import { AppComponent } from './app.component';
import { BelcorpLoginFormComponent } from './belcorp/components/belcorp-login-form/belcorp-login-form.component';
import { BelcorpMyaccountAddressBookComponent } from './belcorp/components/belcorp-myaccount-address-book/belcorp-myaccount-address-book.component';
import { BelcorpPasswordComponent } from './belcorp/components/belcorp-password/belcorp-password.component';
import { BelcorpRegisterComponent } from './belcorp/components/belcorp-register/belcorp-register.component';
import { SearchConsultantModule } from './belcorp/components/belcorp-search-consultant/belcorp-search-consultant.module';


@NgModule({
  declarations: [AppComponent, BelcorpLoginFormComponent, BelcorpRegisterComponent, BelcorpPasswordComponent, BelcorpMyaccountAddressBookComponent],
  imports: [
    B2cStorefrontModule.withConfig({
      backend: {
        occ: {
          baseUrl: 'https://keyrusbelcorp.com',
          prefix: '/belcorpws/v2/',
          legacy: false,
        },
      },
      context: {
        urlParameters: ['baseSite', 'language', 'currency'],
        baseSite: ['belcorp-pe', 'belcorp-cl'],
        currency: ['PEN', 'CLP'],
        // urlParameters: ['baseSite', 'language', 'currency'],
        // baseSite: ['electronics-spa', 'electronics', 'apparel-de', 'apparel-uk'],
      },

      // custom routing configuration for e2e testing
      routing: {
        routes: {
          product: {
            paths: ['product/:productCode/:name', 'product/:productCode'],
          },
        },
      },
      // we bring in static translations to be up and running soon right away
      i18n: {
        backend: {
          loadPath: '../assets/i18n-assets/{{lng}}//{{ns}}.json',
        },
        resources: translations,
        chunks: translationChunksConfig,
        fallbackLang: 'en',
      },
      features: {
        level: '1.2',
      },
      cmsComponents: {
        RegisterComponent: {
          component: BelcorpRegisterComponent,
        },
        LoginFormComponent: {
          component: BelcorpLoginFormComponent,
        },
      },
    }),
    FormsModule,
    ReactiveFormsModule,
    I18nModule,
    UrlModule,
    NgxMaskModule.forRoot({}),
    RouterModule,
    SpinnerModule,
    BrowserModule.withServerTransition({ appId: 'spartacus-app' }),
    BrowserTransferStateModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    SearchConsultantModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatRadioModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
