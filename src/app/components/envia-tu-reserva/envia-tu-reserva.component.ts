import { Component, OnInit, Input } from '@angular/core';
import { RentasService } from "src/app/services/rentas.service";
import { ActivatedRoute, Router } from "@angular/router"; 

@Component({
  selector: 'app-envia-tu-reserva',
  templateUrl: './envia-tu-reserva.component.html',
  styleUrls: ['./envia-tu-reserva.component.css']
})
export class EnviaTuReservaComponent implements OnInit {

  from:any;
  to:any;
  modelId:any;
  licencia:any;
  isLoaded:boolean;
  loadedSpiner:boolean;
  error:string;

  detalle:any;
  car:any;
  modelo:any;
  categoria:any;
  categoriaId:any;
  salida:any;
  regreso:any;

  //Variables formulario
  nombre:string = "";
  correo:string = "";
  bcc:string = "";
  subject:string = "";
  telefono:string = "";
  body:string = "";
  footer:string = "";
  tipoPago:string = "";
  condiciones:boolean = false;

  //Variables seguro
  seguros:any[] = [];
  servicioAeropuerto: number = 0;
  conductorAdicional: number = 0;
  servicioDomicilio: number = 0;
  arrTotalAdicionales:any[] = [];
  segurosTotal:number = 0;

  //variables adicionales
  adicionales:any[] = [];
  adicionalesTotal:number = 0;
  constructor(private rently:RentasService, private activeroute:ActivatedRoute, private router: Router) {

    this.activeroute.params.subscribe(params => {     
      //Para cambiar filtro
      this.from = params["from"];
      console.log(this.from, "AYUDA")
      this.to = params["to"];
      this.modelId = params["modelid"];
      this.licencia = params["licencia"];
    });

    this.rently.getReservacion(this.from, this.to, this.modelId).subscribe((response:any) =>{
      if (response.message) {
        this.isLoaded = true;
        this.error = response.message;
      } else {
        this.detalle = response;
        this.car= response.Car;
        this.modelo= response.Car.Model;
        this.categoria= response.Car.Model.Category;
        this.categoriaId= response.Car.Model.Category.Id;
        this.salida=response.DeliveryPlace;
        this.regreso= response.ReturnPlace;
      }
    });

    this.rently.getAdicionales(this.from, this.to, this.modelId).subscribe((response:any) =>{
      const adicionales = response;
      for (let i = 0; i < adicionales.length; i++) {
        const adicional = adicionales[i];

        //Filtramos si es un adicional o es parte del seguro
        if (adicionales[i].type == "Adicional") {
          this.adicionales.push({ detail: adicional, checked: false })
        } else {
          this.seguros.push({ detail: adicional, checked: false })
        }
      }
      this.isLoaded = true;
    });

   }

   onAddingAdicionales(i:any){
    if (this.adicionales[i].checked == true) {

      switch (this.adicionales[i].detail.id) {
        case 1:
          this.servicioAeropuerto = 0;
          break;
        case 4:
          this.conductorAdicional = 0;
          break;
        case 7:
          this.servicioDomicilio= 0;
          break;    
      }

      const newList = this.arrTotalAdicionales.splice(
        this.arrTotalAdicionales.indexOf(i),
        1
      );

      this.adicionalesTotal -= this.adicionales[i].detail.dailyPrice;
      this.adicionales[i].checked = false;
    } else {
      
      switch (this.adicionales[i].detail.id) {
        case 1:
          this.servicioAeropuerto = this.adicionales[i].detail.dailyPrice;
          break;
        case 4:
          this.conductorAdicional = this.adicionales[i].detail.dailyPrice;
          break;
        case 7:
          this.servicioDomicilio= this.adicionales[i].detail.dailyPrice;
          break;    
      }

      this.adicionalesTotal += this.adicionales[i].detail.dailyPrice;
      this.adicionales[i].checked = true;
    }
   }

   onAddingSeguros(i:any){

      if (this.seguros[i].checked == true) {

        const newList = this.arrTotalAdicionales.splice(
          this.arrTotalAdicionales.indexOf(i), 1
        );
        
        this.segurosTotal -= this.seguros[i].detail.dailyPrice * this.detalle.TotalDays;
        this.seguros[i].checked = false;     
      }else{
        let items = this.arrTotalAdicionales.push({
          AdditionalId: this.seguros[i].detail.id,
          Quantity: 1
        })

        this.segurosTotal += this.seguros[i].detail.dailyPrice * this.detalle.TotalDays;
        this.seguros[i].checked = true;
      }  
   }

   cambiarPago(valor:string){
     document.getElementById(valor)?.click();
   }

   setCondiciones(){
    this.condiciones = !this.condiciones;
   }

   reservar(total:any){
    if (this.nombre != "" && this.correo != "" && this.telefono != "" && this.tipoPago != "" && this.condiciones != false) {
      this.loadedSpiner = true;
      this.rently.reservar(this.arrTotalAdicionales, this.from, this.to, this.modelId, this.nombre, this.correo,this.telefono).subscribe((response:any) =>{
        if (!response.message) { 
              
          this.rently.checkout(this.correo, this.nombre, this.modelo.Name, total).subscribe((response:any) =>{

            //let data = JSON.stringify(response);
            //console.log(response);
            this.loadedSpiner = false;
            
            window.location.href = response;
            
          },error => {
            console.log(error);
          })
 
        } 
      });
    } else {
      alert("Complete todos los campos.")
    }
   }

   reservarCorreo(){

    let correoCliente = this.correo;

    this.body = "<h1>RIVERO RENTAS - SOLICITUD DE RESERVACION</h1>"+
    "<h4>INFORMACION DE CONTACTO</h4>"+

    "<table width='600px;' BORDER CELLPADDING=10 CELLSPACING=0>"+

    "<tr><th colspan=2 bgcolor='#BDBDBD'>CLIENTE</th></tr>"+
    "<tr><th>Nombre:</th><td>"+this.nombre+"</td></tr>"+
    "<tr><th>Correo:</th><td>"+this.correo+"</td></tr>"+
    "<tr><th>Telefono:</th><td>"+this.telefono+"</td></tr>"+
    "</table>";

    this.subject = this.nombre+" SE HA CONTACTADO CON NOSOTROS PARA UNA RESERVACION.";
    this.nombre = ", "+this.nombre+" se ha contactado con nosotros por el motivo de reservacion.";
    this.bcc = "inforenta@gruporivero.com";
    this.correo = "inforenta@gruporivero.com";

    if (this.nombre != "" && this.correo != "" && this.telefono != "" && correoCliente != "" ) {
      this.rently.enviarContactoNuevo(this.correo, this.nombre,  this.subject, this.body, this.footer , this.bcc).subscribe(resp =>{
        alert("Se ha enviado la solicitud, responderemos tan pronto sea posible")
        this.router.navigate(['home']);
        
      }, error =>{
        alert("Ha ocurrido un error, intente más tarde")
      })
    } else {
      alert("Complete todos los campos.")
    }
   }

    numberWithCommas(x:any) {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }
    quitarNulos(x:any) {
      var parts = x.replace(' ','-');
      parts = parts.toString().split("-");
      parts=parts[2]+'/'+parts[1]+'/'+parts[0]+' '+parts[3];
      console.log(parts,"AIM HIR")
      return parts;
  }

  ngOnInit(): void {
  }

}
