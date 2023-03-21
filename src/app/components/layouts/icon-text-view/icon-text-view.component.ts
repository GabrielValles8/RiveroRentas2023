import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon-text-view',
  templateUrl: './icon-text-view.component.html',
  styleUrls: ['./icon-text-view.component.css']
})
export class IconTextViewComponent implements OnInit {

  arrBeneficios:any[] = [];
  @Input() iconText: any;
  @Input() iconImg: any;

  //transURL:any = this.sanitizer.bypassSecurityTrustResourceUrl(this.iconImg);

  constructor() {

    this.arrBeneficios = [
      {text: "Transparencia", img:"assets/images/icons/icon_transparencia.svg"},
    {text: "Transparencia", img:"assets/images/icons/icon_cuidamos.svg"},
    {text: "Servicio a domicilio", img:"assets/images/icons/icon_domicilio.svg"},
    {text: "Lo hacemos fácil", img:"assets/images/icons/icon_facil.svg"},
    {text: "Soluciones a tu medida", img:"assets/images/icons/icon_soluciones.svg"}
    ];
   }

  ngOnInit(): void {
    //this.transURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.iconImg);

    //this.iconImg = 'assets/images/icons/icon_transparencia.svg';

  }

}
