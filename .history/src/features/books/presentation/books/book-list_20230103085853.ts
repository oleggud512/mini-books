import { HttpClient, json } from "aurelia-fetch-client"
import * as fetchClient from "aurelia-fetch-client"
import {autoinject} from "aurelia-framework"
import {Router} from "aurelia-router"
import * as s from "aurelia-dependency-injection"
import { Book } from "../../domain/Book"

@autoinject
export class BookList {
  title = "BOOK LIST"
  books: Book[] = []

  constructor(private router: Router, private client: HttpClient) {
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
    const req = {
      query: `
        query {
          books(limit: 666) {
            _id
            name
            description
          }
        }
      `
    }
    const res = await this.client.fetch('graphql', {
      method: 'POST',
      body: JSON.stringify(req)
    })
    const json = await res.json()
    this.books = json.data.books
  }
}