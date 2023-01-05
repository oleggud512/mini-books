export class LenValueConverter {
  fromView(val: string, len: number) {
    if (val.length > len) {
      return val.substring(0, len - 1)
    }
    return val
  }

  toView(val: string, len: number) {
    if (val.length > len) {
      return val.substring(0, len - 1)
    }
    return val
  }
}