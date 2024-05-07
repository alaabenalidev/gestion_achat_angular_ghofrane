import {Component, OnInit} from '@angular/core';
import {ProduitService} from '../../../service/produit/produit.service';
import {Produit} from "../../../model/Produit";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClientService} from "../../../service/client/client.service";
import {Client} from "../../../model/Client";
import {FournisseurProduitService} from "../../../service/fournisseurProduit/fournisseurProduit.service";
import {FournisseurProduit} from "../../../model/FournisseurProduit";
import {CommandeService} from "../../../service/commande/commande.service";

@Component({
  selector: 'app-list-produit',
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})
export class PanierComponent implements OnInit {

  data: Produit[] = [];
  dataFiltered: Produit[] = [];
  listFournisseurProduct: FournisseurProduit[] = [];

  panierForm!: FormGroup;
  produitForm!: FormGroup;
  clients: Client[] = []
  selectedIndexProductItem: number = -1

  fournisseurProduit: FournisseurProduit[] = []


  constructor(private commandeService: CommandeService, private produitService: ProduitService, private fb: FormBuilder, private clientService: ClientService, private fournisseurProduitService: FournisseurProduitService) {
  }

  ngOnInit(): void {
    this.getAllProduit();
    this.loadClients();
    this.getAllFournisseurProduit();
    this.initForm()
  }

  loadClients() {
    this.clientService.getAllClinet().subscribe(data => {
      this.clients = data
    })
  }

  getAllFournisseurProduit() {
    this.fournisseurProduitService.getAllProduit().subscribe(data => {

      this.listFournisseurProduct = data
    })
  }

  loadFounrnisseurProduit() {
    this.fournisseurProduitService.getFournisseurProduitByProduitId(this.data[this.selectedIndexProductItem].id_Produit).subscribe(data => {

      this.fournisseurProduit = data
    })
  }

  initForm() {
    this.panierForm = this.fb.group({
      items: this.fb.array([])
    })

    this.produitForm = this.fb.group({
      clientProdutit: [null, [Validators.required]],
    })
  }

  get items(): FormArray {
    return this.panierForm.get('items') as FormArray;
  }

  addItemWithProduct(produit: FournisseurProduit): void {
    this.items.push(this.fb.group({
      id: produit.id,
      qte: 1,
    }));
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  getAllProduit() {
    return this.produitService.getAllProduit().subscribe(
      (info) => {
        this.data = info;
        this.dataFiltered = info
      },
      (error) => {
        console.log(error);
      }
    )
  }

  onSubmit(): void {
    if (this.panierForm.valid) {
      this.commandeService.saveCommand(this.panierForm.value).subscribe(data => {
        this.panierForm.reset()
        this.items.clear()
      })
    }
  }

  onSubmitAddProductToCard(): void {

    if (this.produitForm.valid) {
      this.addItemWithProduct(this.fournisseurProduit[this.produitForm.value.clientProdutit])
      this.produitForm.reset()
    }

  }

  changeSelectedProductItem(i: number) {
    this.selectedIndexProductItem = i
    this.loadFounrnisseurProduit()

  }

  getItemProduct(element: { id: number; qte: number }): Produit | null {
    let value: Produit | null = null;
    this.listFournisseurProduct.forEach(el => {
      if (el.id == element.id) {
        value = el.produit;
      }
    })
    return value;
  }

  getItemFournisseur(element: { id: number; qte: number }): FournisseurProduit | null {
    let value: FournisseurProduit | null = null;
    this.listFournisseurProduct.forEach(el => {
      if (el.id == element.id) {
        value = el;
      }
    })
    return value;
  }

  searchProduct(input: any) {
    let word = input.target.value;

    this.dataFiltered = this.data.filter(item => item.type.toLowerCase().includes(word.toLowerCase()) || item.description.toLowerCase().includes(word.toLowerCase()) || item.reference.toLowerCase().includes(word.toLowerCase()));
  }
}
