import { bindable, autoinject, children } from "aurelia-framework"
import { Router } from "aurelia-router"

@autoinject
export class MyHeader {
  @bindable title: string
  @bindable back: boolean = false
  @children('actions') actions = []

  constructor(private router: Router) { }

  navigateBack() {
    this.router.navigateBack()
  }

  react(){ 
    console.log(this.actions)
  }
}