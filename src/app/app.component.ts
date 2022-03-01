import { Component } from '@angular/core';
import { DataService } from './data.service';
import { donnees } from './donnes';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  obj: donnees =  new donnees;
  tabArt: Array<any> = [];
  boutiqueId: Array<any> = [];
  categoriId: Array<any> = [];
  idselection!: Number;

  constructor(private data:DataService) {
    this.getAll();
    this.getcatArt();
  }
   public saveData(registerForm: NgForm): void {
  }

  getcatArt() {
    let request = {
      "user": 1,
      "data":
        {},
      "index":0,
    "size":20
    }
    this.data.post('categorieArticle/getByCriteria', request).subscribe((res: any) => {
    })
  }
  getAll() {
    let request = {
      "user": 1,
      "data":
        {},
      "index":0,
    "size":20
    }
    this.data.post('article/getByCriteria', request).subscribe((res: any) => {
      this.tabArt = res.items;
      this.boutiqueId = res.items;
      this.categoriId = res.items
      console.log(this.categoriId);

    })
  }
  Add():void {
    if (this.obj['id']) {
      let request = {
      "user": 1,
    "datas": [
      {
        "libelle": this.obj.libelle,
        "code": this.obj.code,
        "prixAchat": this.obj.prixAchat,
        "prixVente": this.obj.prixVente,
        "categorieArticleId": this.obj.categorieArticleId,
        "boutiqueId": this.obj.boutiqueId,
        "id": this.obj['id'],
      }
    ]
    }
    this.data.post('article/update', request).subscribe((res: any) => {
      console.log('vous avez modifier les donnes de l Id',this.obj['id'],res)
      this.getAll()
      this.obj = new donnees()
    })
    }
    else {
      this.AddOne()
    }
  }
  AddOne():void {
     let request = {
      "user": 1,
      "datas": [
        {
          "libelle": this.obj.libelle,
          "code": this.obj.code,
          "prixAchat": this.obj.prixAchat,
          "prixVente": this.obj.prixVente,
          "categorieArticleId": this.obj.categorieArticleId,
          "boutiqueId": this.obj.boutiqueId,
        }
      ],
    }
    this.data.post('article/create', request).subscribe((res: any) => {
    console.log("vous avez ajouter" , res );

      this.getAll();
      this.obj = new donnees();
    })
  }
  Del(id:Number): void {
    let request = {
      "user": 1,
      "datas": [{
        "id": id
      }]
    }
    this.data.post('article/delete',request).subscribe((res => {
      this.getAll();
    }))
  }
  Upd(article : any) {
     this.obj = { ...article };
  }
}
