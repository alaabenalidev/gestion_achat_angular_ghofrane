import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Produit } from '../../../model/Produit';
import { ProduitService } from '../../../service/produit/produit.service';

@Component({
  selector: 'app-create-produit',
  templateUrl: './create-produit.component.html',
  styleUrls: ['./create-produit.component.css']
})
export class CreateProduitComponent implements OnInit {
  messageErreur = false;
  messageSuccess = false;
  ProduitRegister!: FormGroup;

  constructor(private produitService: ProduitService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validationForm();
  }

  validationForm(): void {
    this.ProduitRegister = this.fb.group({
      type: ['', [Validators.required]],
      reference: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      description: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      prix: ['', [Validators.required, Validators.min(0.01)]],
    });
  }

  saveAllProduit(produit: Produit): void {
    if (this.ProduitRegister.valid) {
      this.produitService.saveProduit(produit).subscribe(
        (data) => {
          this.messageSuccess = true;
          // Réinitialiser le formulaire après succès
          this.ProduitRegister.reset();
        },
        (error) => {
          console.log('Erreur lors de l\'enregistrement du produit : ', error);
          // Afficher un message d'erreur à l'utilisateur si nécessaire
          this.messageErreur = true;
        }
      );
    }
  }

  // Accéder aux contrôles de formulaire pour la validation dans le template
  get type() { return this.ProduitRegister.get('type'); }
  get reference() { return this.ProduitRegister.get('reference'); }
  get description() { return this.ProduitRegister.get('description'); }
  get prix() { return this.ProduitRegister.get('prix'); }
}
