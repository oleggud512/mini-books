import {bindable} from 'aurelia-framework'
import {Router, RouterConfiguration, NavigationInstruction} from "aurelia-router"
import {autoinject} from "aurelia-framework"

import { Book } from '../../domain/Book'
import { HttpClient } from 'aurelia-fetch-client'
/*
edit / add - на основе того существует или нет эта книга
  и как это проверить?
    book.id == "" ? add : edit
edit / view - на основе просто флага. По умолчанию - view. 
  устанавливается в ручную. 

1. Книгу отображаем. Книгу обновляем. Книгу добавляем.
- нужно книгу удалять. 
- нужно главы отображать
- в редатировании 
  обновлять
  добавлять
  удалять

для этого:
  - отдельный компонент в который я передам bookId 
  - прямо тут
    тогда тут добавятся методы
      addChapter
      deleteChapter
      viewChapter
  
  разделение имеет смысл только в том случае если я хочу как-то разделить логику. 
  больше это никакой смысловой нагрузки не несет. 
*/
@autoinject
export class BookView {
  // view mode
  @bindable isEdit = true
  
  get submitText() {
    return this.book._id == "" ? "Add" : "Save"
  }
  
  book = new Book()

  constructor(private router: Router, private client: HttpClient) { }

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

  async fetchBook(bid: string) {
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
    this.book = json.data.book
  }

  async addThisBook() {
    const req = {
      query: `
        mutation {
          createBook(name: "${this.book.name}", description: "${this.book.description}") {
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
  }

  async updateThisBook() {
    const req = {
      query: `
        mutation {
          updateBook(
            book: {
              _id: "${this.book._id}",
              name: "${this.book.name}",
              description: "${this.book.description}",
              chapters: [
                ${this.book.chapters.map(ch => `{ 
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
    this.book = json.data.updateBook
    this.isEdit = false
  }

  deleteThisBook() {
    const req = {
      query: `
        mutation {
          deleteBook(_id: ${this.book._id})
        }
      `
    }
  }


  showChapter(chapter) {
    console.log(chapter)
    this.router.navigateToRoute('chapterView', {
      bid: this.book._id,
      cid: chapter._id,
    })
  }
}