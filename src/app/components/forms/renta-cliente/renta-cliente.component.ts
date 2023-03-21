import { Component, OnInit } from '@angular/core';
import { RentasService } from "src/app/services/rentas.service";

@Component({
  selector: 'app-renta-cliente',
  templateUrl: './renta-cliente.component.html'
})
export class RentaClienteComponent implements OnInit {

  nombre:string="";
  empresa:string="";
  email:string="";
  telefono:string="";
  mensaje:string="";
  body:string="";
  footer:string="";
  bcc:string="";
  subject:string="";
  loadedSpiner:boolean;
  error:string;

  constructor(private rently:RentasService) { }

  ngOnInit(): void {
  }

  sendContact(){

    let correoCliente = this.email;

    this.body = "<h1>RIVERO RENTAS EMPRESARIAL</h1>"+
    "<h4>INFORMACION DE CONTACTO</h4>"+

    "<table width='600px;' BORDER CELLPADDING=10 CELLSPACING=0>"+

    "<tr><th colspan=2 bgcolor='#BDBDBD'>CLIENTE</th></tr>"+
    "<tr><th>Nombre:</th><td>"+this.nombre+"</td></tr>"+
    "<tr><th>Empresa:</th><td>"+this.empresa+"</td></tr>"+
    "<tr><th>Correo:</th><td>"+this.email+"</td></tr>"+
    "<tr><th>Telefono:</th><td>"+this.telefono+"</td></tr>"+

    "<tr><th colspan=2 bgcolor='#BDBDBD'>INFORMACIÓN</th></tr>"+
    "<tr><th>Mensaje:</th><td>"+this.mensaje+"</td></tr>"+
    "</table>";

    this.subject = this.nombre+" de la empresa "+this.empresa+" se ha contactado con nosotros.";
    this.nombre = ", "+this.nombre+" se ha contactado con nosotros.";
    this.bcc = "inforenta@gruporivero.com";
    this.email = "rentasflotillas@gruporivero.com";

    if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.email) && this.nombre != "" && this.empresa != "" && this.telefono != '' && correoCliente != '') {
      this.loadedSpiner =true;
      this.rently.enviarContactoNuevo(this.email, this.nombre, this.subject, this.body, this.footer , this.bcc).subscribe((response:any) => {
        this.loadedSpiner =false;
        if (response != 'error') {
          alert("Se ha enviado la informacion, responderemos tan pronto sea posible")
        window.location.href = '';
        } else {
          alert("Hubo un problema con el envío de tus datos, intenta más tarde.")
        }
      }); 
    } else {
      alert("Campos vacíos")
    }

    
  }

}
