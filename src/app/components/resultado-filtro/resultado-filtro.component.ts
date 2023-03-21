import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { RentasService } from "src/app/services/rentas.service";
import { FormControl, Validators,FormGroup } from "@angular/forms";
import * as moment from "moment";
import { Router } from "@angular/router";

const today = new Date();
today.setDate(today.getDate()+1);
const month = today.getMonth();
const year = today.getFullYear();
const day = today.getDay();

interface Horario {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-resultado-filtro',
  templateUrl: './resultado-filtro.component.html',
  styleUrls: ['./resultado-filtro.component.css']
})

export class ResultadoFiltroComponent implements OnInit {
  minDate: Date;
  maxDate: Date;

  campaignOne = new FormGroup({
    start: new FormControl(new Date(year,month,day)),
    end:new  FormControl(new Date(year,month,day)),
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

  sltCarList:any[] = [
    { id: 0, type: "Todos", checked: null, img: "assets/images/botones/btn_eco.svg" },
    {id: 6, type: 'Economicos', checked: null, img: "assets/images/botones/btn_eco.svg", select: "assets/images/botones/btn_eco_activ.svg"},
    {id: 5, type: 'Sedanes', checked: null, img: "assets/images/botones/btn_sedan.svg", select: "assets/images/botones/btn_sedan_activ.svg"},
    {id: 9, type: 'Pasajeros', checked: null, img: "assets/images/botones/btn_suv.svg", select: "assets/images/botones/btn_suv_activ.svg"},
    { id: 10, type: "Pasajeros", checked: null, img: "assets/images/botones/btn_suv.svg", select: "assets/images/botones/btn_suv_activ.svg"},
    { id: 12, type: "Carga", checked: null, img: "assets/images/botones/btn_carga.svg", select: "assets/images/botones/btn_carga_activ.svg"},
    { id: 13, type: "Pasajeros", checked: null, img: "assets/images/botones/btn_suv.svg", select: "assets/images/botones/btn_suv_activ.svg"},
    { id: 14, type: "Carga", checked: null, img: "assets/images/botones/btn_carga.svg", select: "assets/images/botones/btn_carga_activ.svg"},
    {id: 16, type: 'Carga', checked: null, img: "assets/images/botones/btn_carga.svg", select: "assets/images/botones/btn_carga_activ.svg"},
    { id: 30, type: "Sedanes", checked: null, img: "assets/images/botones/btn_sedan.svg", select: "assets/images/botones/btn_sedan_activ.svg"}
  ];

  sltLicenseNl:boolean = false;
  sltLicenseFo:boolean = false;
  license:string =  '';
  active:boolean = false;
  error:string = '';
  isLoaded:boolean = true;
  items:any[] = [];
  itemsTipos:any[] = [];
  vehiculos:any;

  //Variables seccion fecha
  fecha:any = new Date();
  minFechaInicio:any;
  fechaInicio:any;
  horaEntrega:any;
  minFechaEntrega:any;
  fechaEntrega:any;
  minEntrega:any;
  fromDate = new FormControl();
  //fromDate = new FormControl(moment(this.fecha)).setValidators(Validators.required);
  toDate = new FormControl();
  initialFromDate:any;
  initialToDate:any;
  matStartDate:any;
  matEndDate:any;
 
  constructor(private router: ActivatedRoute, private rently: RentasService, private router2: Router) {
   
    let currentYear = new Date();
    currentYear.setDate(currentYear.getDate()+1);
    this.minDate = currentYear;
  


    this.minFechaInicio =new Date();
    this.minFechaEntrega =  moment().add(1, "days").format("DD-MM-YYYY HH:mm");

 

    this.router.params.subscribe(params => {
      this.campaignOne = new FormGroup({
        start:new FormControl(moment(params["from"], "YYYY-MM-DD").format()),
        end:new FormControl(moment(params["to"], "YYYY-MM-DD").format()),
      });
      this.sltCarList[1]["checked"] = params["economico"] == "true" ? true:false;
      this.sltCarList[2]["checked"] = params["sedanes"] == "true" ? true:false;
      this.sltCarList[3]["checked"] = params["pasajeros"]== "true" ? true:false;
      this.sltCarList[4]["checked"] = params["pasajeros"]== "true" ? true:false;
      this.sltCarList[5]["checked"] = params["carga"]== "true" ? true:false;
      this.sltCarList[6]["checked"] = params["pasajeros"]== "true" ? true:false;
      this.sltCarList[7]["checked"] = params["carga"]== "true" ? true:false;
      this.sltCarList[8]["checked"] = params["carga"]== "true" ? true:false;
      this.sltCarList[9]["checked"] = params["sedanes"]== "true" ? true:false;
      this.sltLicenseNl = params["licencia"] ==="local" ? true: false;
      this.sltLicenseFo = params["licencia"] ==="foraneo" ? true: false;
      this.license = params["licencia"];

      //Para cambiar filtro
      this.fechaInicio = params["from"];
      this.fechaEntrega = params["to"];

    

      this.initialFromDate = params["from"];
      this.initialToDate = params["to"];
      this.fromDate = new FormControl(moment(params["from"], "YYYY-MM-DD HH:mm").format());
      this.toDate = new FormControl(moment(params["to"], "YYYY-MM-DD HH:mm").format());
      
    });
    
    this.rently.getInitialSearch(this.initialFromDate, this.initialToDate).subscribe((data: any) =>{
      this.isLoaded = true;
      console.log(data,"Este es el ARRAY de CARROS");
     const vehiculos = data;
     if (vehiculos.ErrorCode) {
       this.isLoaded = false;
       this.error = vehiculos.ErrorMessage;
     } else if(data.length == 0){
      this.isLoaded = false;
      this.error = "No se encontraron resultados, intente con diferente fecha.";
     }else{
       for (let i = 0; i < vehiculos.length; i++) {
         const vehiculo = vehiculos[i];
         console.log(vehiculo.category);
         switch (vehiculo.category.id) {
          case 6:
            if(this.itemsTipos.indexOf("Economicos")!=0){
              this.itemsTipos.push("Economicos");
            }
          break;
          case 5:case 30:
            if(this.itemsTipos.indexOf("Sedanes")!=0){
              this.itemsTipos.push("Sedanes");
            }
          break;
          case 9:case 10:case 13:
            if(this.itemsTipos.indexOf("Pasajeros")!=0){
              this.itemsTipos.push("Pasajeros");
            }
          break;
          case 16: case 12:case 14:
            if(this.itemsTipos.indexOf("Carga")!=0){
              this.itemsTipos.push("Carga");
            }
          break;
          default:
            break;
         }
         //console.log(vehiculo);
         //const items = [];
         this.items.push({detail: vehiculo, activo: true});
         //this.items = items;
         console.log(this.items);
         
       }
       this.onFilterCategory();
       this.isLoaded = false;
     }
    })
    

   }
 
  ngOnInit(): void {
    
  }

  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement,hora: HTMLInputElement) {
    this.fechaInicio=moment(dateRangeStart.value,"DD-MM-YYYY").format("YYYY-MM-DD")+"%20"+hora.value;
    this.fechaEntrega=moment(dateRangeEnd.value,"DD-MM-YYYY").format("YYYY-MM-DD")+"%20"+hora.value;
  }

  setInicio(e:any){

    /*let fechaActual = moment(e, "DD-MM-YYYY HH:mm").day();
    this.fechaInicio = moment(e, "DD-MM-YYYY HH:mm").format("YYYY-MM-DD HH:mm");
    //this.fechaIniio = new Date(this.fechaInicio);
    if (fechaActual !== 6) {
      
      this.fechaEntrega = moment(e, "DD-MM-YYYY HH:mm").add(1, "days").format("YYYY-MM-DD HH:mm");
      this.toDate = new FormControl(moment(e, "DD-MM-YYYY HH:mm").add(1, "days").format());
    } else {
      this.fechaEntrega = moment(e, "DD-MM-YYYY HH:mm").add(2, "days").format("YYYY-MM-DD HH:mm");
      this.toDate = new FormControl(moment(e, "DD-MM-YYYY HH:mm").add(2, "days").format());
    }
    this.minEntrega = moment(e, "DD-MM-YYYY HH:mm").add(1, "days").format();
    */
  }

  setEntrega(e:any){
    this.fechaEntrega = moment(e, "DD-MM-YYYY HH:mm").format("YYYY-MM-DD HH:mm");
    this.toDate = new FormControl(moment(e, "DD-MM-YYYY HH:mm").format());
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

  onAddingCar(i:any){
    if (this.sltCarList[i].checked == true) {
      switch (i) {
        case 0:
          for (let t = 0; t < 10; t++) {
            this.sltCarList[t].checked = false;           
          }
          this.sltCarList[1].checked = true;
          break;
        case 2:
          this.sltCarList[i].checked = false;
          this.sltCarList[9].checked = false;
          break;
        case 3:
          this.sltCarList[i].checked = false;
          this.sltCarList[4].checked = false;
          this.sltCarList[6].checked = false;
          break;
        case 7:
          this.sltCarList[i].checked = false;
          this.sltCarList[5].checked = false;

          this.sltCarList[8].checked = false;      
          break;
      
        default:
          this.sltCarList[i].checked = false;
          break;
      }
    } else {
      switch (i) {
        case 0:
          for (let t = 0; t < 10; t++) {
            this.sltCarList[t].checked = true;           
          }
          
          break;
        case 2:
          this.sltCarList[i].checked = true;
          this.sltCarList[9].checked = true;
          break;
        case 3:
          this.sltCarList[i].checked = true;
          this.sltCarList[4].checked = true;
          this.sltCarList[6].checked = true;
          break;
        case 7:
          this.sltCarList[i].checked = true;
          this.sltCarList[5].checked = true;
          this.sltCarList[8].checked = true;      
          break;
      
        default:
          this.sltCarList[i].checked = true;
          break;
      }
    }
    this.onFilterChangeCategory()
  }
  onFilterChangeCategory(){
    this.router.params.subscribe(params => {
      const inicioUrl = params["from"];
      const entregaUrl = params["to"];
      const inicioDate = this.fechaInicio;
      const entregaDate = this.fechaEntrega;
      let validador=0;
for(var i=0;i< this.sltCarList.length;i++){
  if(this.sltCarList[i].checked==true){
    validador=1;
  }
}
      //if (inicioUrl == inicioDate && entregaUrl == entregaDate) {
        if(validador==1){

          this.sltCarList.forEach(car => {    
            this.items.forEach(product => {           
              const prod = product;
        
              if (car.checked == true) {
                switch (car.type) {
                  case 'Economicos':
                     
                    if (prod.detail.category.id == 6) {
                      Object.assign(prod, {activo: true});
                    }
                    break;
                  case 'Sedanes':
                    
                    if (prod.detail.category.id == 5 || prod.detail.category.id == 30) {
                      Object.assign(prod, {activo: true});
                    }
                  break;
                  case 'Pasajeros':
                    if (prod.detail.category.id == 9 || prod.detail.category.id == 10 || prod.detail.category.id == 13) {
                      Object.assign(prod, {activo: true});
                    }
                  break;
                  case 'Carga':
                    
                    if (prod.detail.category.id == 12 || prod.detail.category.id == 14 || prod.detail.category.id == 16) {
                      Object.assign(prod, {activo: true});
                    }
                  break;      
                }
                
                car.checked = true;
              }else {
             
                if (prod.detail.category.id == car.id) {
                  Object.assign(prod, {activo: false});
                }
                car.checked = false;
              }
            });
          });
        }else{
          this.sltCarList.forEach(car => {    
           
            this.items.forEach(product => {           
              const prod = product;
              if (prod.detail.category.id == car.id) {
                Object.assign(prod, {activo: true});
              }
              car.checked = false;
            })
          });
        }
        
      //} else {
        
        //this.router2.navigate(['/resultado-filtro', this.fechaInicio, this.fechaEntrega, this.sltCarList[0]['checked'], this.sltCarList[1]['checked'], this.sltCarList[2]['checked'], this.sltCarList[2]['checked'], this.license])
      
       // window.location.href = "resultado-filtro/"+this.fechaInicio+"/"+ this.fechaEntrega +"/"+this.sltCarList[1]['checked']+"/"+this.sltCarList[2]['checked']+"/"+this.sltCarList[3]['checked']+"/"+this.sltCarList[7]['checked']+"/"+ this.license;
        /*"resultado-filtro/" +
        this.fechaInicio +
        "/" +
        this.fechaEntrega +
        "/" + this.sltCarList[1]['checked']+
        "/" +
        this.sltCarList[2]["checked"] +
        "/" +
        this.sltCarList[3]["checked"] +
        "/" +
        this.sltCarList[5]["checked"] + 
        "/" + this.license;*/
    
      
     // }
      
    });
  }
  onFilterCategory(){
    
    this.router.params.subscribe(params => {
     
      const inicioUrl = params["from"];
      const entregaUrl = params["to"];
      const inicioDate = this.fechaInicio;
      const entregaDate = this.fechaEntrega;

      if (inicioUrl == inicioDate && entregaUrl == entregaDate) {

      if(params.carga=="true"||params.pasajeros=="true"||params.economico=="true"||params.sedanes=="true"){
          this.sltCarList.forEach(car => {    

            this.items.forEach(product => {           
              const prod = product;

              if (car.checked == true) {
                
                
                switch (car.type) {
                  case 'Economicos':
                    
                    if (prod.detail.category.id == 6) {
                      Object.assign(prod, {activo: true});
                    } else {
                      Object.assign(prod, {activo: false});//PARCHE PARA NO MOSTRAR LA SUV QUE COMO PREDETERMINADA APARECE COMO ACTIVO:TRUE
                    }
                    break;
                  case 'Sedanes':
                    if (prod.detail.category.id == 5 || prod.detail.category.id == 30) {
                      Object.assign(prod, {activo: true});
                    }
                  break;
                  case 'Pasajeros':
                    if (prod.detail.category.id == 9 || prod.detail.category.id == 10 || prod.detail.category.id == 13) {
                      Object.assign(prod, {activo: true});
                    }
                  break;
                  case 'Carga':
                    if (prod.detail.category.id == 12 || prod.detail.category.id == 14 || prod.detail.category.id == 16 ) {
                      Object.assign(prod, {activo: true});
                    }
                  break;      
                }
                
                car.checked = true;
              } else {

                if (prod.detail.category.id == car.id) {
                  Object.assign(prod, {activo: false});
                }
                car.checked = false;
              }
            });
           
          });
        }
      } else {
        
        //this.router2.navigate(['/resultado-filtro', this.fechaInicio, this.fechaEntrega, this.sltCarList[0]['checked'], this.sltCarList[1]['checked'], this.sltCarList[2]['checked'], this.sltCarList[2]['checked'], this.license])
      
        window.location.href = "resultado-filtro/"+this.fechaInicio+"/"+ this.fechaEntrega +"/"+this.sltCarList[1]['checked']+"/"+this.sltCarList[2]['checked']+"/"+this.sltCarList[3]['checked']+"/"+this.sltCarList[7]['checked']+"/"+ this.license;
        /*"resultado-filtro/" +
        this.fechaInicio +
        "/" +
        this.fechaEntrega +
        "/" + this.sltCarList[1]['checked']+
        "/" +
        this.sltCarList[2]["checked"] +
        "/" +
        this.sltCarList[3]["checked"] +
        "/" +
        this.sltCarList[5]["checked"] + 
        "/" + this.license;*/
    
        console.log(this.fechaInicio,"this")
      }
      
    });
  }

}
