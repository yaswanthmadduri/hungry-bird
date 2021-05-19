import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingSpinnerService } from './loading-spinner.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit {


  showSpinner = false;
  constructor(private loadingSpinnerService : LoadingSpinnerService, private cdRef : ChangeDetectorRef ) { }

  ngOnInit(): void {
    this.init();
  }

  init(){
    this.loadingSpinnerService.getSpinnerObserver().subscribe((status) => {
      this.showSpinner = status === 'start';
      this.cdRef.detectChanges();
    });
  }
}
