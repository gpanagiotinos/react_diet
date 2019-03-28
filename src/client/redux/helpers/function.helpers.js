export const removeObjectAttribute = (instanceObject) => {
  return deleteAttr => {
    const newInstanceObject = JSON.parse(JSON.stringify(instanceObject))
    for (const prop in newInstanceObject) {
      if (prop === deleteAttr) {
        delete newInstanceObject[deleteAttr]
      } else if (typeof newInstanceObject[prop] === "object") {
        newInstanceObject[prop] = removeObjectAttribute(newInstanceObject[prop])(
          deleteAttr
        )
      }
    }
    return newInstanceObject
  }
}