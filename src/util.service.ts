import { Injectable } from '@angular/core';
import * as moment from 'moment'
@Injectable({
    providedIn: 'root'
})
export class UtilService {
    public static generateRandomNumber(max){
        return Math.floor(Math.random() * Math.floor(max))
    }

    toDDMMMFormat(day:number, month:number){
        return moment(`${day}/${month}`, 'dd/mm').format('dd MMM');
    }

    public static toDDMMMFormatInDefinedFormat(datetime:string){
        let convertedDate =  moment(datetime, 'DD-MM-YYYY').format('DD MMM');
        return convertedDate;
    }
}