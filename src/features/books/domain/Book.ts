import { Chapter } from "../../chapters/domain/Chapter";

export class Book {
  constructor(
    public _id: string = "",
    public name: string = "",
    public description: string = "",
    public chapters: Chapter[] = []
  ) { }
}