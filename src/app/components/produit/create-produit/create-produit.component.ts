import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Produit} from '../../../model/Produit';
import {ProduitService} from '../../../service/produit/produit.service';
import {Categorie} from "../../../model/Categorie";
import {CategorieService} from "../../../service/categorie/categorie.service";
import {Router} from "@angular/router";
import {Client} from "../../../model/Client";
import {ClientService} from "../../../service/client/client.service";

@Component({
  selector: 'app-create-produit',
  templateUrl: './create-produit.component.html',
  styleUrls: ['./create-produit.component.css']
})
export class CreateProduitComponent implements OnInit {
  messageErreur = false;
  messageSuccess = false;
  ProduitRegister!: FormGroup;
  categories: Categorie[] = []
  clients: Client[] = []

  constructor(private produitService: ProduitService, private categorieService: CategorieService, private clientService: ClientService, private fb: FormBuilder, private route: Router) {
  }

  loadCategories() {
    this.categorieService.getAllCategorie().subscribe(data => {
      this.categories = data
    })
  }

  loadClients() {
    this.clientService.getAllClientByIdCategorie(this.categorie?.value).subscribe(data => {
      this.clients = data
    })
  }

  ngOnInit(): void {
    this.validationForm();
    this.loadCategories();

    this.ProduitRegister.get('categorie')?.valueChanges.subscribe(value => {
      console.log('Value changed:', value);
      this.loadClients()
      // You can perform any action here based on the changed value
    });
  }

  validationForm(): void {
    this.ProduitRegister = this.fb.group({
      type: ['', [Validators.required]],
      reference: ['', [Validators.required]],
      description: ['', [Validators.required]],
      categorie: [null, [Validators.required]]
    });
  }

  saveAllProduit(produit: Produit): void {
    if (this.ProduitRegister.valid) {
      this.categories.map(el => {
        if (this.categorie && el.id_Categorie == this.categorie.value) {
          produit.categorie = el
        }
      })
      // this.clients.map(el => {
      //   if (this.client && el.id == this.client.value) {
      //     produit.client = el
      //   }
      // })
      this.produitService.saveProduit(produit).subscribe(
        (data) => {
          this.messageSuccess = true;
          this.route.navigateByUrl("/admin/produit/list");
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
  get type() {
    return this.ProduitRegister.get('type');
  }

  get reference() {
    return this.ProduitRegister.get('reference');
  }

  get description() {
    return this.ProduitRegister.get('description');
  }

  get prix() {
    return this.ProduitRegister.get('prix');
  }

  get categorie() {
    return this.ProduitRegister.get('categorie');
  }

  get client() {
    return this.ProduitRegister.get('client');
  }
}
