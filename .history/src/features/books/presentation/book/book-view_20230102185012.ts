import {bindable} from 'aurelia-framework'

export class BookView {
  @bindable
  title = "Book View!"
  book

  constructor() {

  }

  async fetchBook() {

  }
}