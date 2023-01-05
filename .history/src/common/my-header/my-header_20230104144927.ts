import { bindable, autoinject } from "aurelia-framework"
import { Router } from "aurelia-router"

@autoinject
export class MyHeader {
  @bindable title: string
  @bindable back: boolean = false

  constructor(private router: Router) { }

  navigateBack() {
    this.router.navigateBack()
  }
}