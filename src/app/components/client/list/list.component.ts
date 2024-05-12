import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../../service/client/client.service';
import {Client} from "../../../model/Client";
import {Categorie} from "../../../model/Categorie";
import {CategorieService} from "../../../service/categorie/categorie.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProduitService} from "../../../service/produit/produit.service";
import {Produit} from "../../../model/Produit";
import {FournisseurProduitService} from "../../../service/fournisseurProduit/fournisseurProduit.service";

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

    data: Client[] = [];
    produits: Produit[] = [];
    messageSuccess = false;
    categories: Categorie[] = []
    clientResgister!: FormGroup;
    messageErreur = false;
    messageSuccsess = false;
    clientProduitsForm!: FormGroup;
    selectedFournisseur!: number;

    constructor(private fournisseurProduitService: FournisseurProduitService, private fb: FormBuilder, private clientService: ClientService, private categorieService: CategorieService, private produitService: ProduitService) {
    }

    validationForm() {
        this.clientResgister = this.fb.group({
            fournisseur: ['', [Validators.required]],
            categorie: ['', [Validators.required]],
        });
    }

    ngOnInit(): void {
        this.getAllUser();
        this.loadCategories();
        this.validationForm();
        this.initForm();
    }

    loadCategories() {
        this.categorieService.getAllCategorie().subscribe(data => {
            this.categories = data
        })
    }

    getAllUser() {
        return this.clientService.getAllClinet().subscribe(
            (data) => {
                this.data = data;
            },
            (error) => {
                console.log(error);

            }
        )
    }

    loadFounrnisseurProduit() {
        this.fournisseurProduitService.getFournisseurProduitByFournisseurId(this.selectedFournisseur).subscribe(data => {
            // this.clients = data.map(value => {
            //   return value.furnisseur;
            // })
            data.map((el, index: number) => {
                this.addItem()
                this.items.at(index)?.patchValue({
                    id: el.id,
                    fournisseur: el.fournisseur.id,
                    produit: el.produit.id_Produit,
                    prix: el.prix,
                    quantite:el.quantite
                })
            })
        })
    }

    getProductByCategory(id: number) {
        this.produitService.getAllProductByCategory(id).subscribe(data => {
            this.produits = data
        })
    }

    initForm(): void {
        this.clientProduitsForm = this.fb.group({
            items: this.fb.array([])
        });
    }

    addItem(): void {
        const item = this.fb.group({
            id: [null],
            produit: ['', Validators.required],
            fournisseur: ['', Validators.required],
            prix: ['', [Validators.required, Validators.min(0.01)]],
            quantite: [1, [Validators.required, Validators.min(1)]]
        });

        this.items.push(item);
    }

    removeItem(index: number): void {
        this.items.removeAt(index);
    }

    get items(): FormArray {
        return this.clientProduitsForm.get('items') as FormArray;
    }

    onSubmitClientProduits(): void {
        // Handle form submission here

        for (let i = 0; i < this.items.length; i++) {
            this.items.at(i).get('fournisseur')?.patchValue(this.selectedFournisseur)
        }

        console.log(this.clientProduitsForm.value)
        console.log(this.clientProduitsForm.valid)
        console.log(this.selectedFournisseur)
        if (this.clientProduitsForm.valid) {
            console.log("yess")
            this.fournisseurProduitService.saveFournisseurProduit(this.clientProduitsForm.value['items']).subscribe((res) => {
                this.getAllUser();
                this.clientProduitsForm.reset();
                this.items.reset();
            })
        }
    }


    removeClient(id: number) {
        if (window.confirm("Are you sure you want to delete?")) {
            this.clientService.deleteClient(id).subscribe(
                () => {
                    window.location.reload();
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    }

    affectFournisseurToCategory() {
        console.log(this.clientResgister.value)
        if (this.clientResgister.valid) {
            let obje: { fournisseur: number, categorie: number } = this.clientResgister.value
            this.clientService.affectFourToCateg(obje.fournisseur, obje.categorie).subscribe(
                (data) => {
                    if (window.confirm("create categorie success")) {
                        this.getAllUser()
                        // this.messageSuccsess=true;
                    }

                },
                (error) => {
                    this.messageErreur = true;
                }
            )
        }
    }
}
