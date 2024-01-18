import {Pipe, PipeTransform} from "@angular/core"

@Pipe({
    name:"wycieczkaFilter",
    pure: false,
})
export class WycieczkaPipe implements PipeTransform{

    transform(value: any, ...args: any[]) {
        // console.log(args[4])
        value = value.filter((val:any)=>val.nazwa.includes(args[0]))
        
        value = value.filter((val:any)=> {
            if(args[1].length==0){
                return true
            }
            else{
                return args[1].includes(val.kraj)
            }
        })
        value = value.filter((val:any)=>{
         return val.cena<=args[2][1] && val.cena>=args[2][0]    
        })

        value = value.filter((val:any)=>{
            if(args[3][0] && args[3][1]){
                return Date.parse(val.dataRozpoczecia)>args[3][0] && Date.parse(val.dataRozpoczecia)<args[3][1]
            }
            return true

    })

    value = value.filter((val:any)=>{
        return val.sredniaOcena>=args[4][0] && val.sredniaOcena<=args[4][1] 
    })
        
        return value
    }
}