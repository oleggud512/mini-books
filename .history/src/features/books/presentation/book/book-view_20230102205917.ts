import {bindable} from 'aurelia-framework'
import {Router, RouterConfiguration} from "aurelia-router"
import {autoinject} from "aurelia-framework"

import { Book } from '../../domain/Book'
/*
edit / add - на основе того существует или нет эта книга
  и как это проверить?
    book.id == "" ? add : edit
edit / view - на основе просто флага. По умолчанию - view. 
  устанавливается в ручную. 
*/
@autoinject
export class BookView {
  @bindable isEdit = false
  
  book = new Book("empty id", "empty name", "empty description")

  constructor(private router: Router) {
    console.log(router.baseUrl)
  }

  activate(params, routerConfig: RouterConfiguration) {
    console.log(routerConfig)
    console.log(params)
  }

  async submit() {
    console.log(this.book)
  }

  async fetchBook() {
    console.log("fetchBook")
  }
}