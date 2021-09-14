import { Component, Input } from '@angular/core';
import { IGoodsBaseItem } from 'src/app/core/models/goods.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() value!: IGoodsBaseItem;
}
