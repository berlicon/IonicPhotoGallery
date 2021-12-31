import { Component, Input } from '@angular/core';

@Component({
  selector: 'popover-component',
  templateUrl: 'popover.component.html',
})
export class PopoverComponent {
  @Input() collapsedBreadcrumbs: any[] = []; //HTMLElement

  constructor() {}

}