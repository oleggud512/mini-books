import { HttpClient, json } from "aurelia-fetch-client"
import * as fetchClient from "aurelia-fetch-client"
import {autoinject} from "aurelia-framework"
import {Router} from "aurelia-router"
import * as s from "aurelia-dependency-injection"
import { Book } from "../../domain/Book"
import BooksRepository from "../../data/BooksRepository"
import Debouncer from "common/Debouncer"

@autoinject
export class BookList {
  title = "BOOK LIST"
  books: Book[] = []

  some
  lastName
  filter = ""
  filterDebouncer = new Debouncer(300)

  constructor(private router: Router, private repo: BooksRepository) {
    console.log("BookList.constructor")
    this.filterDebouncer.debounce(() => {
      console.log("the end.")
    })
  }
  
  activate() {
    console.log("BookList.activate")
    this.refreshBooks()
  }

  showAddNewPage() {
    this.router.navigateToRoute('bookAddView')
  }

  query(str: any) {
    console.log(str)
    console.log(this.lastName)
    this.filterDebouncer.debounce(async () => {
      // this.books = await this.repo.fetchBooks({filter: this.filter, limit: 666})
      console.log(this.filter)
    })
  }

  async refreshBooks() {
    this.books = await this.repo.fetchBooks()
  }
}