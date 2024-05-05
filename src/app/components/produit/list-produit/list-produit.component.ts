import {Component, OnInit} from '@angular/core';
import {ProduitService} from '../../../service/produit/produit.service';
import {Produit} from "../../../model/Produit";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClientService} from "../../../service/client/client.service";
import {Client} from "../../../model/Client";
import {FournisseurProduitService} from "../../../service/fournisseurProduit/fournisseurProduit.service";

@Component({
  selector: 'app-list-produit',
  templateUrl: './list-produit.component.html',
  styleUrl: './list-produit.component.css'
})
export class ListProduitComponent implements OnInit {

  data: Produit[] = [];

  clientsForm!: FormGroup;
  clients: Client[] = []
  selectedIndexProductItem: number = -1

  constructor(private produitService: ProduitService, private fb: FormBuilder, private clientService: ClientService, private fournisseurProduitService: FournisseurProduitService) {
  }

  ngOnInit(): void {
    this.getAllProduit();
    this.initForm()
  }

  loadClients() {
    this.clientService.getAllClientByIdCategorie(this.data[this.selectedIndexProductItem].categorie.id_Categorie).subscribe(data => {
      this.clients = data
    })
  }

  loadFounrnisseurProduit() {
    this.fournisseurProduitService.getFournisseurProduitByProduitId(this.data[this.selectedIndexProductItem].id_Produit).subscribe(data => {
      // this.clients = data.map(value => {
      //   return value.furnisseur;
      // })
      data.map((el, index: number) => {
        this.addItem()
        this.items.at(index)?.patchValue({
          id: el.id,
          fournisseur: el.fournisseur.id,
          produit: el.produit.id_Produit,
          prix: el.prix
        })
      })
    })
  }

  initForm() {
    this.clientsForm = this.fb.group({
      items: this.fb.array([])
    })
  }

  get items(): FormArray {
    return this.clientsForm.get('items') as FormArray;
  }

  addItem(): void {
    this.items.push(this.fb.group({
      id: [null],
      fournisseur: ['', Validators.required],
      produit: [this.data[this.selectedIndexProductItem].id_Produit, Validators.required],
      prix: ['', [Validators.required, Validators.min(0.01)]],
    }));
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  getAllProduit() {
    return this.produitService.getAllProduit().subscribe(
      (info) => {
        this.data = info;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  removeProduit(id: number) {

    if (window.confirm("Are you sure you want to delete?")) {
      this.produitService.removeProduit(id).subscribe(
        () => {
          window.location.reload();
        },
        (error) => {
          window.confirm("error");
        }
      );
    }

  }

  onSubmit(): void {
    if (this.clientsForm.valid) {
      this.fournisseurProduitService.saveFournisseurProduit(this.clientsForm.value['items']).subscribe((res) => {
        this.getAllProduit();
        this.clientsForm.reset();
        this.items.reset();
      })
    }
  }

  changeSelectedProductItem(i: number) {
    this.selectedIndexProductItem = i
    this.loadClients()
    this.loadFounrnisseurProduit()

  }
}
