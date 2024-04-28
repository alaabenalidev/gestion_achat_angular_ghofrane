import { Component, OnInit } from '@angular/core';
import { Client } from '../../../model/Client';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../../service/client/client.service';
import {Categorie} from "../../../model/Categorie";
import {CategorieService} from "../../../service/categorie/categorie.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {

  clientResgister!:FormGroup;
  messageErreur=false;
  messageSuccsess=false;
  categories: Categorie[] = []
  categorieResgister!: FormGroup;


  constructor(private fb:FormBuilder,private clientService:ClientService,private categorieService: CategorieService,private route:Router){}

  loadCategories() {
    this.categorieService.getAllCategorie().subscribe(data => {
      this.categories = data
    })
  }

  ngOnInit(): void {
    this.validationForm();
    this.validationCategForm();
    this.loadCategories();
  }


  validationCategForm(): void {
    this.categorieResgister = this.fb.group({
      name: [],
    });
  }

  validationForm(){
    this.clientResgister= this.fb.group({
      nom : ['',[Validators.required]],
      prenom : ['',[Validators.required]],
      adresse : ['',[Validators.required]],
      ville : ['',[Validators.required]],
      num_tel : ['',[Validators.required]],
      categorie : ['',[Validators.required]],
    });
  }

  saveCateg(categorie: Categorie) {


    this.categorieService.saveCategorie(categorie).subscribe(
      (data) => {
        if (window.confirm("create categorie success")) {
          this.loadCategories()
          this.categorieResgister.reset()
          // this.messageSuccsess=true;
        }

      },
      (error) => {
        this.messageErreur = true;
      }
    )
  }


  saveAllClient(client:Client){
    this.categories.map(el => {
      if (this.categorie && el.id_Categorie == this.categorie.value) {
        client.categorie = el
      }
    })

     this.clientService.createClient(client).subscribe(
      ()=>{
        if(window.confirm("create client success")){
          this.route.navigateByUrl("/admin/client/list");

         // this.messageSuccsess=true;
        }

      },
      (error)=>{
        this.messageErreur=true;
      }
    )
  }

  get categorie() {
    return this.clientResgister.get('categorie');
  }
}
