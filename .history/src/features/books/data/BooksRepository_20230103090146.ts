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
}