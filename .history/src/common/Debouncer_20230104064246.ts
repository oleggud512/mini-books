export default class Debouncer {
  constructor(private milliseconds = 300) { }

  timer: NodeJS.Timeout
  isRunning = false;

  debounce(callback: () => void) {
    if (this.isRunning) {
      clearInterval(this.timer)
      this.isRunning = false
    }
    this.timer = setTimeout(() => {
      callback()
      this.isRunning = false;
    }, this.milliseconds)
    this.isRunning = true
  }
}