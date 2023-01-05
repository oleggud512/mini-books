export default class Debouncer {
  constructor(private milliseconds = 300) { }

  timer: NodeJS.Timeout

  debounce(callback: () => void) {

    this.timer = setTimeout(() => {callback(); console.log(this.timer)}, this.milliseconds)
  }
}