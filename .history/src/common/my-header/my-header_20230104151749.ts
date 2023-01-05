import { bindable, autoinject, children, child } from "aurelia-framework"
import { Router } from "aurelia-router"

@autoinject
export class MyHeader {
  @bindable title: string
  @bindable back: boolean = false
  @children({ filter: (e: HTMLElement) => e.tagName === 'product-block' }) actions = []
  @child('umbra') ch

  constructor(private router: Router) { }

  navigateBack() {
    this.router.navigateBack()
  }

  react(){ 
    console.log(this.actions)
  }
}