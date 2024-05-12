import {Component, OnInit} from '@angular/core';
import {ProduitService} from '../../../service/produit/produit.service';
import {Produit} from "../../../model/Produit";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClientService} from "../../../service/client/client.service";
import {Client} from "../../../model/Client";
import {FournisseurProduitService} from "../../../service/fournisseurProduit/fournisseurProduit.service";
import {FournisseurProduit} from "../../../model/FournisseurProduit";
import {CommandeService} from "../../../service/commande/commande.service";
import {Categorie} from "../../../model/Categorie";
import {CategorieService} from "../../../service/categorie/categorie.service";

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

    categories: Categorie[] = []
    produits: Produit[] = []
    selectedIdCategory: number = 0;


    constructor(private commandeService: CommandeService, private categorieService: CategorieService, private produitService: ProduitService, private fb: FormBuilder, private clientService: ClientService, private fournisseurProduitService: FournisseurProduitService) {
    }

    ngOnInit(): void {
        this.getAllProduit();
        this.loadClients();
        this.getAllFournisseurProduit();
        this.loadCategories()
        this.initForm()
    }

    // loadFounrnisseurProduit() {
    //   this.fournisseurProduitService.getFournisseurProduitByFournisseurId(this.selectedFournisseur).subscribe(data => {
    //     // this.clients = data.map(value => {
    //     //   return value.furnisseur;
    //     // })
    //     this.produits = data
    //     data.map((el, index: number) => {
    //       this.addItem()
    //       this.items.at(index)?.patchValue({
    //         id: el.id,
    //         fournisseur: el.fournisseur.id,
    //         produit: el.produit.id_Produit,
    //         prix: el.prix,
    //         quantite:el.quantite
    //       })
    //     })
    //   })
    // }

    loadCategories() {
        this.categorieService.getAllCategorie().subscribe(data => {
            this.categories = data
        })
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

    loadFounrnisseurProduitWithId() {
        this.fournisseurProduitService.getFournisseurProduitByProduitId(this.selectedIndexProductItem).subscribe(data => {

            this.fournisseurProduit = data
        })
    }

    getProductByCategory(id: number) {
        this.produitService.getAllProductByCategory(id).subscribe(data => {
            this.produits = data
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

    addItemWithoutProduct(): void {
        this.items.push(this.fb.group({
            id: null,
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

    changeSelectedProductIdItem(event: any) {
        this.selectedIndexProductItem = event.target.value
        this.loadFounrnisseurProduitWithId()

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

    getItemFournisseur1(index: number): FournisseurProduit | null {
        let value: FournisseurProduit | null = null;
        let ligne = this.items.at(index)
        this.listFournisseurProduct.forEach(el => {
            if (ligne.value.id == el.id) {
                value = el;
            }
        })
        return value;
    }

    searchProduct(input: any) {
        let word = input.target.value;

        this.dataFiltered = this.data.filter(item => item.type.toLowerCase().includes(word.toLowerCase()) || item.description.toLowerCase().includes(word.toLowerCase()) || item.reference.toLowerCase().includes(word.toLowerCase()));
    }

    changeSelectedCategoryItem(event: any) {
        console.log(event.target.value)
        this.selectedIdCategory = event.target.value
        this.getProductByCategory(this.selectedIdCategory)
    }

    getTotalSum() {
        let totalsum = 0;
        for (let i = 0; i < this.items.length; i++) {
            totalsum += (this.items?.value[i].qte || 1) * (this.getItemFournisseur1(i)?.prix || 1)
        }
        return totalsum;
    }
}
