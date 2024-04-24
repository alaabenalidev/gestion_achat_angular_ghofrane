import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../service/client/client.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

  data:any=[];
  messageSuccess=false;

  constructor(private clientService:ClientService){}

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser(){
   return this.clientService.getAllClinet().subscribe(
      (data)=>{
        this.data=data;
      },
      (error)=>{
        console.log(error);

      }
    )
  }

  removeClient(id: number) {
    if (window.confirm("Are you sure you want to delete?")) {
      this.clientService.deleteClient(id).subscribe(
        () => {
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }




}
