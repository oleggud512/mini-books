import { HttpClient, json } from "aurelia-fetch-client"
import * as fetchClient from "aurelia-fetch-client"
import {autoinject} from "aurelia-framework"
import {Router} from "aurelia-router"
import * as s from "aurelia-dependency-injection"
import { Book } from "../../domain/Book"
import { BooksRepository } from "../../data/BooksRepository"

@autoinject
export class BookList {
  title = "BOOK LIST"
  books: Book[] = []

  constructor(private router: Router, private repo: BooksRepository) {
    console.log("BookList.constructor")
  }
  
  activate() {
    console.log("BookList.activate")
    this.refreshBooks()
  }

  showAddNewPage() {
    this.router.navigateToRoute('bookAddView')
  }

  async refreshBooks() {
    this.books = await this.repo.getBooks()
  }
}