import { Chapter } from "../domain/Chapter"

export class ChapterView {
  isEdit = false;

  bid: string
  cid: string
  chpater: Chapter

  activate(params) {
    this.bid = params.bid
    if (params.cid) {
      // chapter exists - i will edit or view this chapter
    } else {
      // chapter does not exist - add this chapter
    }
  }
}