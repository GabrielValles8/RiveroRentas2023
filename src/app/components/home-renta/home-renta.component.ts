import { Component, OnInit } from '@angular/core';
import { FormControl, Validators,FormGroup } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import * as moment from "moment";
interface Horario {
  value: string;
  viewValue: string;
}

const today = new Date();

const month = today.getMonth();
const year = today.getFullYear();
const day = today.getDay();

@Component({
  selector: 'app-home-renta',
  templateUrl: './home-renta.component.html',
  styles: [
  ]
})


export class HomeRentaComponent implements OnInit {
  minDate: Date;
  maxDate: Date;

  campaignOne = new FormGroup({
    start: new FormControl( moment().add(2, "days").format("YYYY-MM-DD")),
    end:new  FormControl( moment().add(4, "days").format("YYYY-MM-DD")),
  });
  
  horarios: Horario[] = [
    {value: '10:00', viewValue: '10:00'},
    {value: '10:30', viewValue: '10:30'},
    {value: '11:00', viewValue: '11:00'},
    {value: '11:30', viewValue: '11:30'},
    {value: '12:00', viewValue: '12:00'},
    {value: '12:30', viewValue: '12:30'},
    {value: '13:00', viewValue: '13:00'},
    {value: '13:30', viewValue: '13:30'},
    {value: '14:00', viewValue: '14:00'},
    {value: '14:30', viewValue: '14:30'},
    {value: '15:00', viewValue: '15:00'},
    {value: '15:30', viewValue: '15:30'},
    {value: '16:00', viewValue: '16:00'},
    {value: '16:30', viewValue: '16:30'},
    {value: '17:00', viewValue: '17:00'},
    {value: '17:30', viewValue: '17:30'},
    {value: '18:00', viewValue: '18:00'}
  ];

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();

    /* Prevent Saturday and Sunday for select. */
    return day !== 0 ;
}

  filter: number;
  sltCarList:any[] = [
    {id: 6, type: 'Economicos', isChecked: false, img: "assets/images/botones/btn_eco.svg", select: "assets/images/botones/btn_eco_activ.svg"},
    {id: 5, type: 'Sedanes', isChecked: false, img: "assets/images/botones/btn_sedan.svg", select: "assets/images/botones/btn_sedan_activ.svg"},
    {id: 9, type: 'Pasajeros', isChecked: false, img: "assets/images/botones/btn_suv.svg", select: "assets/images/botones/btn_suv_activ.svg"},
    {id: 16, type: 'Carga', isChecked: false, img: "assets/images/botones/btn_carga.svg", select: "assets/images/botones/btn_carga_activ.svg"}
  ];
  //Variables seccion
  sltLicenseNl: boolean = false;
  sltLicenseFo: boolean =false;
  license: string = 'local';
  
  //Variables seccion fecha
  fecha:any = new Date();
  minFechaInicio:any;
  fechaInicio:any;
  minFechaEntrega:any;
  fechaEntrega:any;
  minEntrega:any;
  fromDate = new FormControl(moment(this.fecha, "DD-MM-YYYY HH:mm").add(1, "days").format());
  toDate = new FormControl(moment(this.fecha, "DD-MM-YYYY HH:mm").add(2, "days").format());

  constructor(private datepipe: DatePipe, private router: Router) { 
    let currentYear = new Date();
    currentYear.setDate(currentYear.getDate()+1);
    this.minDate = currentYear;
  


    this.minFechaInicio =new Date();
    this.minFechaEntrega =  moment().add(1, "days").format("DD-MM-YYYY HH:mm");

    this.filter = 0;
    this.minFechaInicio =new Date();
    this.minFechaEntrega =  moment().add(1, "days").format("DD-MM-YYYY HH:mm");
    this.fechaInicio = moment().add(1, 'days').format("YYYY-MM-DD HH:mm");
    this.fechaEntrega = moment().add(2, 'days').format("YYYY-MM-DD HH:mm");
    
  }

  ngOnInit(): void {
  }

  setInicio(e:any){
    
    let fechaActual = moment(e, "DD-MM-YYYY HH:mm").day();
    this.fechaInicio = moment(e, "DD-MM-YYYY HH:mm").format("YYYY-MM-DD HH:mm");
    //this.fechaInicio = new Date(this.fechaInicio);
    if (fechaActual !== 6) {
      
      this.fechaEntrega = moment(e, "DD-MM-YYYY HH:mm").add(1, "days").format("YYYY-MM-DD HH:mm");
      this.toDate = new FormControl(moment(e, "DD-MM-YYYY HH:mm").add(1, "days").format());
    } else {
    
      this.fechaEntrega = moment(e, "DD-MM-YYYY HH:mm").add(2, "days").format("YYYY-MM-DD HH:mm");
     
      this.toDate = new FormControl(moment(e, "DD-MM-YYYY HH:mm").add(2, "days").format());
    }
    this.minEntrega = moment(e, "DD-MM-YYYY HH:mm").add(1, "days").format();

  }

  setEntrega(e:any){
    this.fechaEntrega = moment(e, "DD-MM-YYYY HH:mm").format("YYYY-MM-DD HH:mm");
    this.toDate = new FormControl(moment(e, "DD-MM-YYYY HH:mm").format());
  }

  onAddingCar(i:any){
    if (this.sltCarList[i].isChecked == true) {
        this.sltCarList[i].isChecked = false;
    } else {
        this.sltCarList[i].isChecked = true;
    }
  }

  onAddingLicenseNl(){
    //this.sltLicenseNl = !this.sltLicenseNl;
    if (this.sltLicenseNl == true) {
      this.sltLicenseFo = false;
      this.sltLicenseNl = false;
      this.license = '';
    } else {
      this.sltLicenseFo = false;
      this.sltLicenseNl = true;
      this.license = 'local';
    }
  }

  onAddingLicenseFo(){
    //this.sltLicenseFo = !this.sltLicenseFo;
    if (this.sltLicenseFo == true) {
      this.sltLicenseFo = false;
      this.sltLicenseNl = false;
      this.license = '';
    } else {
      this.sltLicenseFo = true;
      this.sltLicenseNl = false;
      this.license = 'foraneo';
      
    }
  }

  resultado(){
    
    this.router.navigate(['/resultado-filtro', this.fechaInicio])
  }
  
  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement,hora: HTMLInputElement) {
    this.fechaInicio=moment(dateRangeStart.value,"DD-MM-YYYY").format("YYYY-MM-DD")+" "+hora.value;
    this.fechaEntrega=moment(dateRangeEnd.value,"DD-MM-YYYY").format("YYYY-MM-DD")+" "+hora.value;

    // EN ESTE APARTADO, SE ELIMINO EL %20 EN LA SECCION DEL MOMENTO +" "+hora.value YA QUE CAUSABA PROBLEMAS AL CONTRUIR LA URL
  }

}
