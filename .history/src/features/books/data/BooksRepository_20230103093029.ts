import { HttpClient } from "aurelia-fetch-client";
import {autoinject} from "aurelia-framework"
import { Book } from "../domain/Book";

@autoinject
export class BooksRepository {
  constructor(private client: HttpClient) { }

  async fetchBooks() : Promise<Array<Book>> {
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
    return json.data.books
  }

  async fetchBook(bid: string) : Promise<Book> {
    const req = {
      query: `
        query {
          book(id: "${bid}") {
            _id
            name
            description
            chapters {
              _id
              name
            }
          }
        }
      `
    }
    console.log("fetchBook")
    const res = await this.client.fetch('graphql', {
      method: 'POST',
      body: JSON.stringify(req)
    })
    const json = await res.json()
    return json.data.book
  }

  async addThisBook(book: {name: string, description: string}) : Promise<Book> {
    const req = {
      query: `
        mutation {
          createBook(name: "${book.name}", description: "${book.description}") {
            name,
            description
          }
        }
      `
    }
    const res = await this.client.fetch("graphql", {
      method: 'POST',
      body: JSON.stringify(req)
    })
    const json = await res.json()
    return json.data.createBook
  }
}