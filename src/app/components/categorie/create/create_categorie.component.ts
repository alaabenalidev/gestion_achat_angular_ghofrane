import { Component, OnInit } from '@angular/core';
import { Client } from '../../../model/Client';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {CategorieService} from "../../../service/categorie/categorie.service";
import {Categorie} from "../../../model/Categorie";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create_categorie.component.html',
  styleUrl: './create_categorie.component.css'
})
export class CreateCategorieComponent implements OnInit {

  categorieResgister!:FormGroup;
  messageErreur=false;
  messageSuccsess=false;


  constructor(private fb:FormBuilder,private categorieService:CategorieService,private route:Router){}

  ngOnInit(): void {
    this.validationForm();
  }

  validationForm(){
    this.categorieResgister= this.fb.group({
      name : ['',[Validators.required]],
    });
  }


  saveAllClient(categorie:Categorie){


     this.categorieService.saveCategorie(categorie).subscribe(
      ()=>{
        if(window.confirm("create categorie success")){
          this.route.navigateByUrl("/admin/categorie/list");
         // this.messageSuccsess=true;
        }

      },
      (error)=>{
        this.messageErreur=true;
      }
    )
  }
}
