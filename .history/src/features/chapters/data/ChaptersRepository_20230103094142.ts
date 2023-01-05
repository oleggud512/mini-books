import { HttpClient } from "aurelia-fetch-client";
import { autoinject } from "aurelia-framework"
import { Chapter } from "../domain/Chapter";

@autoinject
export class ChaptersRepository {
  constructor(private client: HttpClient) { }

  async addChapter(bid: string, chapter: Chapter) {
    const req = {
      query: `
        mutation {
          addChapter(
            bid: "${bid}",
            chapter: {
              name: "${chapter.name}",
              text: "${chapter.text}"
            }
          ) {
            _id
            name
            text
          }
        }
      `
    }
    const res = await this.client.fetch('graphql', {
      method: "POST", 
      body: JSON.stringify(req)
    })
    const json = await res.json()
    return json.data.addChapter
  }
}