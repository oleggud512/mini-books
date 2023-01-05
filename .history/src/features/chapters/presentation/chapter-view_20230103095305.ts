import { Chapter } from "../domain/Chapter"

export class ChapterView {
  bid: string
  cid: string
  chpater: Chapter

  activate(params) {
    console.log(params)
    this.bid = params.bid
  }
}