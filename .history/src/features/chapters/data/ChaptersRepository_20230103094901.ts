import { HttpClient } from "aurelia-fetch-client";
import { autoinject } from "aurelia-framework"
import { Chapter } from "../domain/Chapter";

@autoinject
export class ChaptersRepository {
  constructor(private client: HttpClient) { }

  async addChapter(bid: string, chapter: Chapter) : Promise<Chapter> {
    const req = {
      query: `
        mutation {
          addChapter(
            bid: "${bid}",
            chapter: {
              name: "${chapter.name}",
              text: "${chapter.text}"
            }
          ) { _id name text }
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

  async fetchChapter(bid: string, cid: string) : Promise<Chapter> {
    const req = {
      query: `
        query {
          chapter(bid: "${bid}", cid: "${cid}") { _id name text }
        }
      `
    }
    const res = await this.client.fetch('graphql', {
      method: 'POST', 
      body: JSON.stringify(req)
    })
    const json = await res.json()
    return json.data.chapter
  }

  async updateChapter(bid: string, chapter: Chapter) : Promise<Chapter> {
    const req = {
      query: `
        mutation {
          updateChapter(
            bid: "${bid}", 
            chapter: {
              _id: "${chapter._id}",
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
    return json.data.udpateChapter
  }
}