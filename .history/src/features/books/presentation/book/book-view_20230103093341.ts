import {bindable} from 'aurelia-framework'
import {Router, RouterConfiguration, NavigationInstruction} from "aurelia-router"
import {autoinject} from "aurelia-framework"

import { Book } from '../../domain/Book'
import { HttpClient } from 'aurelia-fetch-client'
import { BooksRepository } from '../../data/BooksRepository'
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

  Так. Все с книгами. Теперь нужно редактировать главы. По такому же принципу. 
  Еще нужно выделить хотябы один репозитроий. 
*/
@autoinject
export class BookView {
  // view mode
  @bindable isEdit = true
  
  get submitText() {
    return this.book._id == "" ? "Add" : "Save"
  }
  
  book = new Book()

  constructor(private router: Router, private client: HttpClient, private repo: BooksRepository) { }

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
    this.book = await this.repo.fetchBook(bid)
  }

  async addThisBook() {
    await this.repo.addBook(this.book)
  }

  async updateThisBook() {
    this.book = await this.repo.updateBook(this.book)
    this.isEdit = false
  }

  async deleteThisBook() {
    const req = {
      query: `
        mutation {
          deleteBook(_id: "${this.book._id}")
        }
      `
    }
    const res = await this.client.fetch('graphql', {
      method: 'POST',
      body: JSON.stringify(req)
    })
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