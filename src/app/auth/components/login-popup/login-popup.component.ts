import {
    Component,
    ElementRef,
    EventEmitter,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { userLogin, userRegister } from 'src/app/redux/actions/user-data.actions';
import { UserDataSelectors } from 'src/app/redux/selectors/user-data.selectors';
import { AppState } from 'src/app/redux/state.models';
import { IUser } from '../../../core/models/user.model';

@Component({
    selector: 'app-login-popup',
    templateUrl: './login-popup.component.html',
    styleUrls: ['./login-popup.component.scss'],
})
export class LoginPopupComponent implements OnInit {
    @Output() closePopup = new EventEmitter();
    @ViewChild('avatarPreview', { static: false })
    avatarPreview!: ElementRef<HTMLImageElement>;
    public currentUser$!: Observable<IUser>;
    public loginMode = true;
    public newUser = {
        login: '',
        password: '',
        avatar: '',
        firstName: '',
        lastName: '',
        token: '',
        cart: [],
        favourites: [],
        orders: [],
    };

    constructor(private store: Store<AppState>, private selectors: UserDataSelectors) {}

    ngOnInit(): void {
        this.currentUser$ = this.store.select(this.selectors.selectCurrentUser);
    }

    public toRegistration(): void {
        this.loginMode = false;
    }

    public logIn(): void {
        this.store.dispatch(
            userLogin({ login: this.newUser.login, password: this.newUser.password })
        );
        this.closePopup.emit();
    }

    public registration(): void {
        if (!this.newUser.avatar) {
            this.newUser.avatar = this.avatarPreview.nativeElement.src;
        }
        this.store.dispatch(userRegister({ user: this.newUser }));
        this.loginMode = true;
        this.closePopup.emit();
    }

    public base64code(event: Event): void {
        const file = (<HTMLInputElement>event.target).files?.item(0);
        const reader = new FileReader();
        reader.onloadend = () => {
            if (this.avatarPreview && reader.result) {
                this.avatarPreview.nativeElement.src = reader.result.toString();
            }
        };
        if (file?.type.match('image')) {
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.newUser.avatar = reader.result as string;
            };
        }
    }
}
