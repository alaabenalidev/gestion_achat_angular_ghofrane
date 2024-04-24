import { Component, OnInit } from '@angular/core';
import { Client } from '../../../model/Client';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../../service/client/client.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {

  clientResgister!:FormGroup;
  messageErreur=false;
  messageSuccsess=false;


  constructor(private fb:FormBuilder,private clientService:ClientService){}

  ngOnInit(): void {
    this.validationForm();
  }

  validationForm(){
    this.clientResgister= this.fb.group({
      nom : ['',[Validators.required]],
      prenom : ['',[Validators.required]],
      adresse : ['',[Validators.required]],
      ville : ['',[Validators.required]],
      num_tel : ['',[Validators.required]],
    });
  }


  saveAllClient(client:Client){


     this.clientService.createClient(client).subscribe(
      ()=>{
        if(window.confirm("create client success")){
          window.location.reload();
         // this.messageSuccsess=true;
        }

      },
      (error)=>{
        this.messageErreur=true;
      }
    )
  }
}
