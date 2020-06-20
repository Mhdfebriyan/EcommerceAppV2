import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductProvider} from '../../providers/product/product';
import { AlertProvider} from '../../providers/alert/alert';
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  products=[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams, 
    private productProvider: ProductProvider,
    private alertProvider: AlertProvider) {
  }

  
  search(event){
    this.products = [];
    let searchQuery = event.target.value;

    if (searchQuery == ""){
      this.products = [];
    }
    else if (searchQuery.length >= 3){
      this.productProvider.searchProduct(searchQuery).subscribe(
        (result: any[]) => {
          this.products = result;
        },
        error => {
          console.log("errornya: "+ error);
        })
      
    }
  }
  openDetail(id){
    this.alertProvider.showToast("Buatlah perintah untuk membuaka detail produk " + id + "disini");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}
