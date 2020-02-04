import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "dotize"
})
export class DotizePipe implements PipeTransform {
  transform(value: string, ...[length = 30]): any {
    if (value.length > length) {
      return value.substring(0, length - 1) + "...";
    }
    return value;
  }
}
