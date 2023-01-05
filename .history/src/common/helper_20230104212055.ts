
function htmlToTxt(html: string) {
  return html
    .replace(/<div>|<br>/, '\n')
    .replace(/<\/div>/, '')
    .replace(/&nbsp;/, ' ')
}
