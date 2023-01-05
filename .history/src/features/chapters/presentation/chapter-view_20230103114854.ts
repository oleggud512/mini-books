import { Router } from "aurelia-router"
import { autoinject } from "aurelia-framework"
import { ChaptersRepository } from "../data/ChaptersRepository";
import { Chapter } from "../domain/Chapter"

@autoinject
export class ChapterView {
  isEdit = false;

  bid: string
  cid: string
  chapter: Chapter = new Chapter()

  get submitText() {
    return this.chapter._id ? "Add" : "Save"
  }

  constructor(private router: Router, private repo: ChaptersRepository) { }

  activate(params) {
    this.bid = params.bid
    if (params.cid) {
      // chapter exists - i will edit or view this chapter
      this.fetchChapter()
      this.isEdit = false
    } else {
      // chapter does not exist - add this chapter
      this.isEdit = true
    }
  }

  async fetchChapter() {
    this.chapter = await this.repo.fetchChapter(this.bid, this.cid)
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