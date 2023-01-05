import { bindable, autoinject, children } from "aurelia-framework"
import { Router } from "aurelia-router"

@autoinject
@children({ name: "actions", selector: 'custom-actions'})
export class MyHeader {
  @bindable title: string
  @bindable back: boolean = false

  constructor(private router: Router) { }

  navigateBack() {
    this.router.navigateBack()
  }
}