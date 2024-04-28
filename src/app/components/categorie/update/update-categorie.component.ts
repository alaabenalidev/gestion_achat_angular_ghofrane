import { Component, OnInit } from '@angular/core';
import { Client } from '../../../model/Client';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {CategorieService} from "../../../service/categorie/categorie.service";
import {Categorie} from "../../../model/Categorie";

@Component({
  selector: 'app-update',
  templateUrl: './update-categorie.component.html',
  styleUrl: './update-categorie.component.css'
})
export class UpdateCategorieComponent implements OnInit{

  categorieID!:number;
  categorieUpdate!:FormGroup;

  constructor(private router:ActivatedRoute ,private categorieService:CategorieService,private fb:FormBuilder,private route:Router){

  }

  ngOnInit(): void {
    this.router.params.subscribe(
      (param)=>{
        this.categorieID=param['id'];
        this.getClinetById(this.categorieID);
      }
    );
    this.ValidationForm();
  }

  getClinetById(id:number){
    this.categorieService.getCategorieById(id).subscribe(
      (data)=>{
        this.categorieUpdate.patchValue(data);
      }
    )
  }

  ValidationForm(){
    this.categorieUpdate=this.fb.group({
      id_Categorie : ['',[Validators.required]],
      name : ['',[Validators.required]],
    });
  }


  saveClient(categorie : Categorie){
    this.categorieService.updateCategorie(categorie).subscribe(
        (data)=>{
          if (window.confirm("update success")) {
            this.route.navigateByUrl("/admin/categorie/list");
          }
        },
        (error)=>{
          window.confirm("update failed");
        }
      )
    }
}
