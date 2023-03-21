import { Component, OnInit } from '@angular/core';
import { RentasService } from 'src/app/services/rentas.service';
import * as moment from "moment";

@Component({
  selector: 'app-nuestras-unidades',
  templateUrl: './nuestras-unidades.component.html',
  styleUrls: ['./nuestras-unidades.component.css']
})
export class NuestrasUnidadesComponent implements OnInit {

  unidades:any[] = [];
  error:string = '';
  isLoaded:boolean = true;

  fechaInicio:any;
  fechaEntrega:any;

  constructor(private rently:RentasService) { 
    this.fechaInicio =  moment().add(1, "days").format("YYYY-MM-DD");
    this.fechaEntrega =  moment().add(3, "days").format("YYYY-MM-DD");

    this.rently.getCategorias().subscribe((data:any) =>{
      this.isLoaded = true;
      const category = data;
     
      if (category.ErrorCode) {
        this.isLoaded = false;
        this.error = category.ErrorMessage;
      } else if(data.length == 0){
       this.isLoaded = false;
       this.error = "No se encontraron resultados, intente con diferente fecha.";
      }else{
        for (let i = 0; i < category.length; i++) {
          const vehiculo = category[i].Models;
          for (let j = 0; j < vehiculo.length; j++) {
            const detalle = vehiculo[j];
            this.unidades.push(detalle); 
          }        
        }      

        console.log(this.unidades);
        this.isLoaded = false;
      }
    })

  }

  ngOnInit(): void {
  }

}
