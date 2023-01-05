import { HttpClient, json } from "aurelia-fetch-client"
import * as fetchClient from "aurelia-fetch-client"
import {autoinject} from "aurelia-framework"
import {Router} from "aurelia-router"
import * as s from "aurelia-dependency-injection"

interface Chapter {
  _id: string,
  name: string,
  text: string
}

interface Book {
  _id: string,
  name: string,
  description: string
  chapters: Chapter[]  
}

@autoinject
export class BookList {
  client = new HttpClient()
  title = "BOOK LIST"
  books: Book[] = []

  constructor(private router: Router) {
    this.client.configure(conf => {
      conf.baseUrl = "http://localhost:5000/"
    })
    this.refreshBooks()
  }

  showAddNewPage() {
    this.router.navigateToRoute('bookEditView', {'is-edit': true})
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