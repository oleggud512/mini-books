import { htmlToTxt } from "./helper"

export class HtmlTxtValueConverter {
  fromView(value) {
    return htmlToTxt(value)
  }

  toView(value) {
    return value
  }
}