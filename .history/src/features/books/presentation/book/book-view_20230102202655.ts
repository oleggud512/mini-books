import {bindable} from 'aurelia-framework'

import { Book } from '../../domain/Book'

export class BookView {
  @bindable isEdit = false
  
  book = new Book("empty id", "empty name", "empty description")

  activate(params, routerConfig) {
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