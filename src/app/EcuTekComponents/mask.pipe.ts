import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mask'
})
export class MaskPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    debugger;

    if(Number.isInteger(parseInt(value))){
      if(args === "hex"){
        if(value === "" || value === "0"){
          return "#00000";
        }
        return "#" + parseInt(value).toString(16).toUpperCase();
      }
    }

    return value;
  }

}