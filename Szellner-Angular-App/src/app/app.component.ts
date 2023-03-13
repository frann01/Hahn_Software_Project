import { Component } from '@angular/core';
import { LoadingService } from './services/loading.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Szellner-Angular-App';
  loading$ = this.loader.loading$;
  constructor(public loader: LoadingService)
  {}
}
