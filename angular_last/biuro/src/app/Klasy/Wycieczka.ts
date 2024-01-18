export class Wycieczka{
    id:number
    cena:number
    kraj:string
    dataRozpoczecia:Date
    dataZakonczenia:Date
    iloscOcen:number
    iloscZajetychMiejsc:number
    karuzelaZdjec:any[]
    komentarze:any[]
    maxIloscMiejsc:number
    nazwa:string
    opis:string
    sredniaOcena:number
    zdjecie:string

    constructor(){
        this.cena=0
        this.dataRozpoczecia = new Date()
        this.dataZakonczenia = new Date()
        this.iloscOcen = 0
        this.iloscZajetychMiejsc = 0
        this.karuzelaZdjec = []
        this.komentarze =[]
        this.maxIloscMiejsc = 0
        this.nazwa = ""
        this.opis = ""
        this.sredniaOcena = 0
        this.zdjecie = ""
        this.kraj = ""
    }
}