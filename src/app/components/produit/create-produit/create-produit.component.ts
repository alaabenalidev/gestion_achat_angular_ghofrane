import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Produit} from '../../../model/Produit';
import {ProduitService} from '../../../service/produit/produit.service';
import {Categorie} from "../../../model/Categorie";
import {CategorieService} from "../../../service/categorie/categorie.service";
import {Router} from "@angular/router";

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
  categorieResgister!: FormGroup;

  constructor(private produitService: ProduitService, private categorieService: CategorieService, private fb: FormBuilder,private route: Router) {
  }

  loadCategories() {
    this.categorieService.getAllCategorie().subscribe(data => {
      this.categories = data
    })
  }

  ngOnInit(): void {
    this.validationForm();
    this.validationCategForm();
    this.loadCategories()
  }

  validationForm(): void {
    this.ProduitRegister = this.fb.group({
      type: ['', [Validators.required]],
      reference: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      description: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      prix: ['', [Validators.required, Validators.min(0.01)]],
      categorie: [null, [Validators.required]]
    });
  }

  validationCategForm(): void {
    this.categorieResgister = this.fb.group({
      name: [],
    });
  }

  saveAllProduit(produit: Produit): void {
    if (this.ProduitRegister.valid) {
      console.log(produit)
      this.categories.map(el => {
        if (this.categorie && el.id_Categorie == this.categorie.value) {
          produit.categorie = el
        }
      })
      console.log(produit)
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
}
