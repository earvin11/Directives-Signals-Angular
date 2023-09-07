import { Component, OnDestroy, computed, effect, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  selector: 'app-properties-page',
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.css']
})
export class PropertiesPageComponent implements OnDestroy {

  public counter = signal( 10 );
  public user = signal<User>({
    id: 2,
    email: "janet.weaver@reqres.in",
    first_name: "Janet",
    last_name: "Weaver",
    avatar: "https://reqres.in/img/faces/2-image.jpg"
  });

  public fullName = computed( () => `${ this.user().first_name } ${ this.user().last_name }`);

  public userChangedEffect = effect( () => {
    console.log( `${this.user().email} - ${ this.counter() }` );
  });

  ngOnDestroy(): void {
    // this.userChangedEffect.destroy();
  }

  onFieldUpdate(field: keyof User, value: string) {

    // this.user.set({
    //   ...this.user(),
    //   [ field ]: value
    // });

    // this.user.update( current => {
    //   return {
    //     ...current,
    //     [ field ]: value
    //   }
    // });
    
    this.user.mutate( current => {

      switch ( field ) {
        case 'email':
          current.email = value;
          break;

        case 'first_name':
          current.first_name = value;
          break;

        case 'last_name':
          current.last_name = value;
          break;
        
        case 'id':
          current.id = Number(value);
          break;
      }

    });
  }

  increaseBy( value: number ) {
    this.counter.update( currentValue => currentValue + value);
  }

}
