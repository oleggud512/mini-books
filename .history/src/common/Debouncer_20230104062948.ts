export default class Debouncer {
  constructor(private milliseconds = 300) { }

  timer: NodeJS.Timeout

  debounce(callback: () => void) {
    this.timer = setTimeout(callback, this.milliseconds)
  }
}