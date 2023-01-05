import {bindable} from 'aurelia-framework'
import {Router, RouterConfiguration, NavigationInstruction} from "aurelia-router"
import {autoinject} from "aurelia-framework"

import { Book } from '../../domain/Book'
import { HttpClient } from 'aurelia-fetch-client'
import { BooksRepository } from '../../data/BooksRepository'

@autoinject
export class BookView {
  // view mode
  @bindable isEdit = true
  
  get submitText() {
    return this.book._id == "" ? "Add" : "Save"
  }
  
  book = new Book()

  constructor(
    private router: Router, 
    private repo: BooksRepository
  ) { }

  activate(params, routerConfig: RouterConfiguration, inst: NavigationInstruction) {
    if (params.bid) {
      console.log("I want to edit/view an existing book...")
      this.fetchBook(params.bid)
      this.isEdit = false
    } else {
      console.log('NOW I WANT TO ADD A NEW BOOK!')
      this.isEdit = true
    }
    console.log(inst.options)
  }

  changeViewMode() {
    this.isEdit = !this.isEdit
  }

  back() {
    this.router.navigateBack()
  }

  async submit() {
    if (!this.book._id) {
      this.addThisBook()
      this.back()
    } else {
      this.updateThisBook()
    }
    // this.router.navigate('/', { replace: true, trigger: false });
  }
  
  async addThisBook() {
    await this.repo.addBook(this.book)
  }
  
  async updateThisBook() {
    this.book = await this.repo.updateBook(this.book)
    this.isEdit = false
  }

  async fetchBook(bid: string) {
    this.book = await this.repo.fetchBook(bid)
  }

  async deleteThisBook() {
    await this.repo.deleteBook(this.book._id)
    this.back()
  }

  showChapter(chapter) {
    console.log(chapter)
    this.router.navigateToRoute('chapterView', {
      bid: this.book._id,
      cid: chapter._id,
    })
  }
}