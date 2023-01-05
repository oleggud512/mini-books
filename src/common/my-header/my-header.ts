import { bindable, autoinject, children, child } from "aurelia-framework"
import { Router } from "aurelia-router"

@autoinject
export class MyHeader {
  @bindable title: string
  @bindable back: string = "shown"

  constructor(private router: Router) { }

  attached() {
    console.log(`back: ${this.back} type: ${typeof this.back}`)
  }

  navigateBack() {
    this.router.navigateBack()
  }
}