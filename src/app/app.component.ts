import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpHelperService } from './http-helper.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class AppComponent implements OnInit {
  title = 'pollingTable';
  private apiUrl = 'https://hn.algolia.com/api/v1/search_by_date?tags=story';
  hitsData = [];
  modalDataObj = {};
  modalObjectID ='';
  intervalId : any;
  isPolling : boolean;
  postTileSearch = '';

  @ViewChild('content', { static : true}) content : NgbModal;


  constructor(private _http : HttpHelperService, config: NgbModalConfig, private modalService: NgbModal){ }

  ngOnInit(){
    this.getFreshData();
    this.startPollingApi();
  }

  startPollingApi(){
    this.intervalId = setInterval(this.getFreshData.bind(this), 1e4);
  }

  endPollingApi(){
    clearInterval(this.intervalId);
  }

  getFreshData(){
    this.isPolling = true;
    this._http.get(this.apiUrl).subscribe(
      res=> {
        this.hitsData = res.hits;
        this.isPolling = false;
      }
    )
  }

  getFilteredData(){
    if(!this.postTileSearch || !this.postTileSearch.trim()) return this.hitsData;
    return this.hitsData.filter(row=> row.title.toLowerCase().includes(this.postTileSearch.toLowerCase()));
  }

  rowClicked(objectID : string){
    console.log('hh', objectID);
    this.modalObjectID = objectID;
    this.modalDataObj = this.hitsData.filter(row => row.objectID === objectID);
    this.modalService.open(this.content, {size: 'xl'});
  }

  open(content) {
    this.modalService.open(content);
  }

}
