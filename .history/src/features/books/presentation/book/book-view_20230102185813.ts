import {bindable} from 'aurelia-framework'

import { Book } from '../../domain/Book'

export class BookView {
  @bindable isEdit = false
  
  book = new Book()

  activate(params, routerConfig) {

  }

  async submit() {

  }

  async fetchBook() {

  }
}