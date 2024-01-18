import {Pipe, PipeTransform} from "@angular/core"
import { stat } from "fs"

@Pipe({
    name:"kupioneFilter",
    pure: false,
})
export class KupionePipe implements PipeTransform{

    transform(value: any, ...args: any[]) {
        let status = args[0]
        if(status) {
            value = value.filter((val:any)=>val.status==status)
        }
        
        return value
    }
}