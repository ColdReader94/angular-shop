import {
    Component,
    ElementRef,
    EventEmitter,
    Output,
    ViewChild,
} from '@angular/core';
import { LoginService } from 'src/app/auth/services/login.service';
import { IUser } from '../../models/user.model';

@Component({
    selector: 'app-login-popup',
    templateUrl: './login-popup.component.html',
    styleUrls: ['./login-popup.component.scss'],
})
export class LoginPopupComponent {
    @Output() closePopup = new EventEmitter();
    @ViewChild('avatarPreview', { static: false })
    avatarPreview!: ElementRef<HTMLImageElement>;

    public user: IUser = {
        login: '',
        password: '',
        avatar: '',
    };

    constructor(private loginService: LoginService) {}

    public login(): void {
      if (!this.user.avatar) {
        this.user.avatar = this.avatarPreview.nativeElement.src;
      }
        this.loginService.logIn(this.user);
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
                this.user.avatar = reader.result as string;
            };
        }
    }
}
