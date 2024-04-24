import { Component, OnInit } from '@angular/core';
import { Produit } from '../../../model/Produit';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProduitService } from '../../../service/produit/produit.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-produit',
  templateUrl: './update-produit.component.html',
  styleUrls: ['./update-produit.component.css'] // Use styleUrls instead of styleUrl
})
export class UpdateProduitComponent implements OnInit {

  ProduitUpdate!: FormGroup; // Declare ProduitUpdate as FormGroup
  produitID: any;

  constructor(private router:Router,private produitService: ProduitService, private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (param) => {
        this.produitID = param['id'];
        this.getProduitById(this.produitID);
      }
    );

    this.validationForm(); // Initialize form controls
  }

  getProduitById(id: number) {
    this.produitService.getProduitById(id).subscribe(
      (data) => {
        this.ProduitUpdate.patchValue(data); // Patch form values
      },
      (error) => {
        console.log(error);
      }
    );
  }

  validationForm() {
    // Use '=' instead of '==' for assignment
    this.ProduitUpdate = this.fb.group({
      id_Produit: ['', [Validators.required]],
      type: ['', [Validators.required]],
      reference: ['', [Validators.required]],
      description: ['', [Validators.required]],
      prix: ['', [Validators.required]],
    });
  }

  updateProduit(produit: Produit) {
    return this.produitService.updateProduit(produit).subscribe(
      (data) => {
        window.confirm("update sucess");
        this.router.navigateByUrl("/admin/produit/list")
      },
      (error) => {
        window.confirm("error");
      }
    );
  }
}
