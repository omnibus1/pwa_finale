import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataProviderService } from '../../../services/data-provider.service';
import { Wycieczka } from '../../../Klasy/Wycieczka';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wycieczka-form',
  templateUrl: './wycieczka-form.component.html',
  styleUrl: './wycieczka-form.component.css'
})
export class WycieczkaFormComponent {
  id:number=0
  wycieczka:Wycieczka = new Wycieczka()
  form: FormGroup=this.fb.group({
    nazwa: this.wycieczka.nazwa,
    kraj: this.wycieczka.kraj,
    opis: this.wycieczka.opis,
    dataRozpoczecia:this.wycieczka.dataRozpoczecia,
    dataZakonczenia:this.wycieczka.dataZakonczenia,
    maxIloscMiejsc:this.wycieczka.maxIloscMiejsc,
    iloscZajetychMiejsc:this.wycieczka.iloscZajetychMiejsc,
    cena:this.wycieczka.cena,
    zdjecie:this.wycieczka.zdjecie,
    karuzelaZdjec:this.fb.array([])
  })
  constructor(private route: ActivatedRoute, private dataProvider:DataProviderService, private fb: FormBuilder, private router:Router){
    this.route.params.subscribe((param:any) => {
      this.id = param.id
      // console.log(this.id==0)
      // console.log(this.wycieczka.karuzelaZdjec)
      if(this.id!=0){
        dataProvider.getWycieczka(this.id).subscribe(val=>{
          this.wycieczka = val as Wycieczka
          const formValues = {nazwa:this.wycieczka.nazwa, dataRozpoczecia:this.wycieczka.dataRozpoczecia, dataZakonczenia:this.wycieczka.dataZakonczenia,maxIloscMiejsc:this.wycieczka.maxIloscMiejsc,iloscZajetychMiejsc:this.wycieczka.iloscZajetychMiejsc, cena:this.wycieczka.cena, zdjecie:this.wycieczka.zdjecie, kraj:this.wycieczka.kraj, opis:this.wycieczka.opis}
          for(let zdjecie of this.wycieczka.karuzelaZdjec){
            this.addToForm(zdjecie.zdjecie)
          }
          this.form.patchValue(formValues)
          // console.log("GFHGHFGHFGH")
        }
        )
      }
    })
  }
  getValueAtIndex(i:number){
    const controlsArray = this.form.get('karuzelaZdjec') as any;
    return controlsArray.controls[i].controls.zdjecie.value
  }

  createFormValue(val:string){
    return this.fb.group({
      zdjecie:val
    });
  }

  addToForm(val:string = ""){
    const controlsArray = this.form.get('karuzelaZdjec') as any;
    controlsArray.push(this.createFormValue(val))
  }

  removeControl(index: number) {
    const controlsArray = this.form.get('karuzelaZdjec') as any;
    controlsArray.removeAt(index);
  }

  getKaruzelaItems(){
    return this.wycieczka.karuzelaZdjec
  }

  get karuzelaZdjec(){
    return this.form.get('karuzelaZdjec') as FormArray
  }



  onSubmit() {
    console.log(this.form.value)
    if(this.id==0){
      this.dataProvider.createWycieczka(this.form.value).subscribe(
        val=>this.router.navigate(["manage"]),
        error=>console.log(error)
      )
    }
    else{
      this.dataProvider.updateWycieczka(this.id,this.form.value).subscribe(
        val=>this.router.navigate(["manage"]),
        error=>console.log(error)
      )
    }
  }
}
