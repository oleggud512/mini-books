import {Router, RouterConfiguration, NavigationInstruction} from "aurelia-router"
import { autoinject, observable } from "aurelia-framework"

import { Book } from '../../domain/Book'
import BooksRepository from "../../data/BooksRepository"
import ChaptersRepository from '../../../chapters/data/ChaptersRepository'
import { Chapter } from '../../../chapters/domain/Chapter'

function htmlToTxt(html: string) : string {
  return "nothing."
}

@autoinject
export class BookView {
  // view mode
  isEdit = true
  
  get submitText() {
    return this.book._id == "" ? "Add" : "Save"
  }

  @observable variable
  variableChanged(newValue, oldValue) {
    console.log(`variable changed: ${JSON.stringify(newValue)}`)
  }

  book = new Book()

  get isNewBook() : boolean {
    return this.book._id ? true : false
  }

  constructor(
    private router: Router, 
    private repo: BooksRepository,
    private chaptersRepo: ChaptersRepository
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
    console.log(`variable: ${this.variable}`)
    console.log(`description: ${JSON.stringify(this.book)}`)
  }

  back() {
    this.router.navigateBack()
  }
  
  async deleteChapter(chapter: Chapter) {
    if (confirm(`Are sure you want to delete "${chapter.name}" chapter?`)) {
      await this.chaptersRepo.deleteChapter(chapter._id)
      this.book.chapters.splice(this.book.chapters.indexOf(chapter), 1)
    }
  }

  async submit() {
    if (!this.book._id) {
      await this.addThisBook()
      this.back()
    } else {
      await this.updateThisBook()
      this.isEdit = false
    }
    // this.router.navigate('/', { replace: true, trigger: false });
  }
  
  async addThisBook() {
    await this.repo.addBook(this.book)
  }
  
  async updateThisBook() {
    this.book = await this.repo.updateBook(this.book)
    console.log(`updating the book ${this.book}`)
    this.isEdit = false
  }

  async fetchBook(bid: string) {
    this.book = await this.repo.fetchBook(bid)
    console.log(this.book)
  }

  async deleteThisBook() {
    if (confirm("Are you sure you want to delete this book?")) {
      await this.repo.deleteBook(this.book._id)
      this.back()
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