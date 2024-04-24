import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../../service/produit/produit.service';

@Component({
  selector: 'app-list-produit',
  templateUrl: './list-produit.component.html',
  styleUrl: './list-produit.component.css'
})
export class ListProduitComponent implements OnInit {

  data:any=[];
  constructor(private produitService:ProduitService){}

  ngOnInit(): void {
    this.getAllProduit();
  }

  getAllProduit(){
    return this.produitService.getAllProduit().subscribe(
      (info)=>{
        this.data=info;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  removeProduit(id:number){

    if (window.confirm("Are you sure you want to delete?")) {
      this.produitService.removeProduit(id).subscribe(
        ()=>{
            window.location.reload();
        },
        (error)=>{
          window.confirm("error");
        }
      );
    }


  }


}
