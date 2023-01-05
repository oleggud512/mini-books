import { Router } from "aurelia-router"
import { ChaptersRepository } from "../data/ChaptersRepository";
import { Chapter } from "../domain/Chapter"

export class ChapterView {
  isEdit = false;

  bid: string
  cid: string
  chapter: Chapter

  constructor(private router: Router, private repo: ChaptersRepository) { }

  activate(params) {
    this.bid = params.bid
    if (params.cid) {
      // chapter exists - i will edit or view this chapter
      this.isEdit = false
    } else {
      // chapter does not exist - add this chapter
      this.isEdit = true
    }
  }

  async submit() {
    if (!this.chapter._id) {
      // this.addThisBook()
      this.router.navigateBack()
    } else {
      // this.updateThisBook()
    }
    // this.router.navigate('/', { replace: true, trigger: false });
  }

  async addThisChapter() {
    const chapter = await this.repo.addChapter(this.bid, this.chapter);
  }
}