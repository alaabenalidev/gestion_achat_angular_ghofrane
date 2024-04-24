import { Component, OnInit } from '@angular/core';
import { Client } from '../../../model/Client';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../../service/client/client.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit{

  clientID!:number;
  clientUpdate!:FormGroup;

  constructor(private router:ActivatedRoute ,private clientService:ClientService,private fb:FormBuilder,private route:Router){

  }

  ngOnInit(): void {
    this.router.params.subscribe(
      (param)=>{
        this.clientID=param['id'];
        this.getClinetById(this.clientID);
      }
    );
    this.ValidationForm();
  }

  getClinetById(id:number){
    this.clientService.getClientById(id).subscribe(
      (data)=>{
        this.clientUpdate.patchValue(data);
      }
    )
  }

  ValidationForm(){
    this.clientUpdate=this.fb.group({
      id : ['',[Validators.required]],
      nom : ['',[Validators.required]],
      prenom : ['',[Validators.required]],
      adresse : ['',[Validators.required]],
      ville : ['',[Validators.required]],
      num_tel : ['',[Validators.required]],
    });
  }


  saveClient(client : Client){
    this.clientService.updateClient(client).subscribe(
        (data)=>{
          if (window.confirm("update success")) {
            this.route.navigateByUrl("/admin/client/list");
          }
        },
        (error)=>{
          window.confirm("update failed");
        }
      )
    }
}
