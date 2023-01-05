import { HttpClient } from "aurelia-fetch-client";
import {autoinject} from "aurelia-framework"

@autoinject
export class ChaptersRepository {
  constructor(private client: HttpClient) { }
}