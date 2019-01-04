import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appModal]'
})
export class ModalDirective {

  @HostBinding('style.align-items') alignItems = 'center';
  @HostBinding('style.justify-content') justifyContent = 'center';
  @HostBinding('style.vertical-align') verticalAlign = 'middle';
  @HostBinding('style.min-height') minHeight = '100%';
  @HostBinding('style.max-width') maxWidth = '100%';
  @HostBinding('style.width') width = '100%';
  @HostBinding('style.position') position = 'fixed';
  @HostBinding('style.z-index') zIndex = '999';
  @HostBinding('style.background') background = 'rgba(0, 0, 0, .6)';
  @HostBinding('style.left') left = '0';
  @HostBinding('style.top') top = '0';
  @HostBinding('style.bottom') bottom = '0';
  @HostBinding('style.right') right = '0';
  @HostBinding('style.display') display = 'flex';
  @HostBinding('style.overflow-y') overflowY = 'scroll';


  constructor() { }

}
