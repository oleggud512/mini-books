import { bindable, autoinject, children } from "aurelia-framework"
import { Router } from "aurelia-router"

@autoinject
@children('actions')
export class MyHeader {
  @bindable title: string
  @bindable back: boolean = false
  actions = []

  constructor(private router: Router) { }

  navigateBack() {
    this.router.navigateBack()
  }

  react(){ 
    console.log(actions)
  }
}