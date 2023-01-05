import { Router } from "aurelia-router"
import { autoinject } from "aurelia-framework"
import { RouterConfiguration, NavigationInstruction } from "aurelia-router"
import { ChaptersRepository } from "../data/ChaptersRepository";
import { Chapter } from "../domain/Chapter"

@autoinject
export class ChapterView {
  isEdit = false;

  bid: string
  cid: string
  chapter: Chapter = new Chapter()

  get submitText() {
    return this.chapter._id ? "Save" : "Add"
  }

  constructor(private router: Router, private repo: ChaptersRepository) { }

  activate(params, routerConfig: RouterConfiguration, inst: NavigationInstruction) {
    this.bid = params.bid
    if (params.cid) {
      console.log("chapter exists - i will edit or view this chapter")
      this.cid = params.cid
      this.fetchChapter()
      this.isEdit = false
    } else {
      console.log("chapter does not exist - add this chapter")
      this.isEdit = true
    }
  }

  async fetchChapter() {
    const ch = await this.repo.fetchChapter(this.bid, this.cid)
    console.log(`fetchChapter cid:${this.cid} bid:${this.bid} ${JSON.stringify(ch)}`)
    this.chapter = ch
  }

  async submit() {
    if (!this.chapter._id) {
      this.addThisChapter()
      this.router.navigateBack()
    } else {
      this.updateThisChapter()
    }
  }

  async addThisChapter() {
    const chapter = await this.repo.addChapter(this.bid, this.chapter)
    this.chapter = chapter
  }

  async updateThisChapter() {
    console.log(JSON.stringify(this.chapter))
    const chapter = await this.repo.updateChapter(this.bid, this.chapter)
    this.chapter = chapter
  }

  async deleteThisChapter() {
    await this.repo.deleteChapter(this.bid, this.cid)
  }

  changeViewMode() {
    this.isEdit = !this.isEdit
  }
}