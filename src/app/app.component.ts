import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {


  displayedColumns3: string[] = ['action','name'];

  value: string;

  pokemon: any = {};
  
  dataSource;

  showDetail: boolean = false;


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private httpClient: HttpClient){}

  ngOnInit() {
    
    this.get_characters();
    
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (filterValue = ''){
      this.value = ''
    }
  }

  async get_characters(){
    await this.httpClient.get('https://pokeapi.co/api/v2/pokemon/').subscribe((res)=>{
        this.dataSource = new MatTableDataSource(res['results'])
        //console.log("data: ", this.data)
        console.log(this.dataSource)
        this.dataSource.paginator = this.paginator;
    });
  }

  async get_detail(url){
    console.log(url)
    
    await this.httpClient.get(url).subscribe((res)=>{
      console.log(res)
      this.pokemon = res;
      //console.log("data: ", this.data)
      console.log(this.pokemon)
      this.showDetail = true;
    });
  }

}