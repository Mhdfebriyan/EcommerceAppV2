import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Events} from 'ionic-angular';
import { Product } from '../../models/product/product-model';
import { ProductProvider } from '../../providers/product/product';

@Component({
  selector: 'page-detailproduct',
  templateUrl: 'detailproduct.html',
})
export class DetailproductPage {

  response:any;
  product= new Product();
  category=[];
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private productProvider: ProductProvider) {
  }

  ionViewDidLoad() {
      this.category=[];
      this.showCategory();

      if(this.navParams.data.id){
        this.showSelectedProduct(this.navParams.data.id);
        
      }
    }
    
    showCategory() {
      this.productProvider.getCategoryProduct().subscribe(result => {
        this.response = result;
        var data = this.response.data;
        data.forEach(element => {
          this.category.push(element);
        });
      })
    }
  
    showSelectedProduct(id:number){
      this.productProvider.getSelectedProduct(id).subscribe(result => {
        this.response = result;
        let data = this.response.data;
        this.product.name = data.name;
        this.product.price = data.price;
        this.product.categori_id = data.kategori.nama;
        this.product.id = data.id;
        if(data.active==2)
        this.product.active = true;
        this.product.image = data.image;
      });
    }

}

