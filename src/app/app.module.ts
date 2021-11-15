import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { redirectLoggedInTo } from '@angular/fire/compat/auth-guard';
import { AppComponent } from './app.component';
import { JokeSidebarComponent } from './joke-sidebar/joke-sidebar.component';
import { JokeMainComponent } from './joke-main/joke-main.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HeaderComponent } from './header/header.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { NullComponent } from './null/null.component';



const redirectUnauthorizedToRoot = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = ()=> redirectLoggedInTo(['home']);

const appRoutes: Routes = [
  {path: '', component: NullComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToHome}},
  {path: 'home', component: HomeComponent, canActivate: [AngularFireAuthGuard],  data: { authGuardPipe: redirectUnauthorizedToRoot }},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JokeSidebarComponent,
    JokeMainComponent,
    NullComponent,
    HeaderComponent,
    SignUpComponent,
    SignInComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [AngularFireAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}

