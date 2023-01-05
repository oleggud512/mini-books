import {bindable} from 'aurelia-framework'

export class BookView {
  @bindable isEdit = false
  title = "Book View!"
  book

  activate()

  async fetchBook() {

  }
}