import { HttpClient } from "aurelia-fetch-client";
import {autoinject} from "aurelia-framework"
import { Book } from "../domain/Book";

@autoinject
export default class BooksRepository {
  constructor(private client: HttpClient) { }

  async fetchBooks(filter?: string) : Promise<Array<Book>> {
    const req = {
      query: `
        query {
          books(
            limit: 666, 
            filter: ${filter ? `"${filter}"` : "null"}
          ) {
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
    console.log(json)
    return json.data.book
  }

  async addBook(book: {name: string, description: string}) : Promise<Book> {
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

  async updateBook(book: Book) : Promise<Book> {
    const req = {
      query: `
        mutation {
          updateBook(
            book: {
              _id: "${book._id}",
              name: "${book.name}",
              description: "${book.description}",
              chapters: [
                ${book.chapters.map(ch => `{ 
                  ${ch._id ? `_id: "${ch._id}",` : ""} 
                  name: "${ch.name}",
                  text: "${ch.text}"
                }`)}
              ]
            }
          ) {
            _id name description 
            chapters {
              _id name text  
            }
          }
        }
      `
    }
    const res = await this.client.fetch('graphql', {
      method: 'post',
      body: JSON.stringify(req)
    })
    const json = await res.json()
    return json.data.book
  }

  async deleteBook(bid: string) {
    const req = {
      query: `
        mutation {
          deleteBook(id: "${bid}")
        }
      `
    }
    const res = await this.client.fetch('graphql', {
      method: 'POST',
      body: JSON.stringify(req)
    })
  }
}