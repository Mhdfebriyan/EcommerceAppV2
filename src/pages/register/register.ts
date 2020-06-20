import{ Component} from'@angular/core';
import{ NavController, NavParams} from'ionic-angular';
import{ User} from'../../models/user/user-model';
import{ AlertProvider} from'../../providers/alert/alert';
import{ AuthProvider} from'../../providers/auth/auth';
/**
 * Generated class for the RegisterPage page.
 * 
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector:'page-register',
  templateUrl:'register.html',
})
export class RegisterPage{
  user= new User();
  response: any;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertProvider: AlertProvider,
    private authProvider: AuthProvider) 
    { }
    
    //fungsi yang menangani pengiriman data ke provider auth
    //pada saat tombol register di click
    register() {
    //if ini untuk memastikan agar ke 2 password sama
    if(this.user.password== this.user.c_password) {
      //mengirim data keauth provider
      //sekaligus mendapatkan response dari end point
      this.authProvider.register(this.user).subscribe(
        result=>{
          this.alertProvider.showToast("Register berhasil!")
          this.navCtrl.pop();
          console.log(result);
        },
        error=>{
          this.response= error.error;
          console.log(error.error);
          this.alertProvider.showToast("Register gagal, coba dengan email lain!")
        }
        )
      } else{
        this.alertProvider.showToast("Password harus sama!")
      }
    }
    ionViewDidLoad() {
      console.log('ionViewDidLoad RegisterPage');
    }
  }