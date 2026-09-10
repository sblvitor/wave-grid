export default class Utils {
  static getCSSColor(varName) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim()
  }
}
