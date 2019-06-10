import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { ContactComponent } from './contact/contact.component';
import { PongComponent } from './pong/pong.component';

const routes: Routes = [
  { path: '', component: HomeComponent },  
  { path: 'about', component: AboutComponent },
  { path: 'chatroom', component: ChatroomComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'pong', component: PongComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
