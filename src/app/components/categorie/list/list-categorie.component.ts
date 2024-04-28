import { Component, OnInit } from '@angular/core';
import {CategorieService} from "../../../service/categorie/categorie.service";

@Component({
  selector: 'app-list',
  templateUrl: './list-categorie.component.html',
  styleUrl: './list-categorie.component.css'
})
export class ListCategorieComponent implements OnInit {

  data:any=[];
  messageSuccess=false;

  constructor(private categorieService:CategorieService){}

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser(){
   return this.categorieService.getAllCategorie().subscribe(
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
      this.categorieService.removeCategorie(id).subscribe(
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
