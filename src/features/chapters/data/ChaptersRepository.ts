import { HttpClient } from "aurelia-fetch-client";
import { autoinject } from "aurelia-framework"
import { Chapter } from "../domain/Chapter";

@autoinject
export default class ChaptersRepository {
  constructor(private client: HttpClient) { }

  async fetchChapter(bid: string, cid: string) : Promise<Chapter> {
    const req = {
      query: `
        query { 
          chapter(id: "${cid}") { 
            _id 
            name 
            text 
          } 
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

  async addChapter(bid: string, chapter: Chapter) : Promise<Chapter> {
    const req = {
      query: `
        mutation {
          createChapter(
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

  async updateChapter(chapter: Chapter) : Promise<Chapter> {
    const req = {
      query: `
        mutation {
          updateChapter(
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
    return json.data.updateChapter
  }

  async deleteChapter(id: string) {
    const req = {
      query: `
        mutation {
          deleteChapter(id: "${id}")
        }
      `
    }
    await this.client.fetch('graphql', {
      method: 'POST',
      body: JSON.stringify(req)
    })
  }
}