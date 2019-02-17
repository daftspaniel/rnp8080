export const np8080 = 'np8080'

export const getNp8080Store = () => {
  var result = window.localStorage[np8080]
  return result == null ? '{}' : result
}

export const saveStore = store => (window.localStorage[np8080] = JSON.stringify(store))

export const loadValue = (key, defaultValue) => {
  var store = getStorageAsMap()
  var value = store[key]
  if (value == null) {
    value = defaultValue
  }
  return value
}

export const getStorageAsMap = () => {
  var store = JSON.parse(getNp8080Store())
  return store
}

export const deleteStoredValue = key => {
  var store = getStorageAsMap()
  store.remove(key)
  saveStore(store)
}

export const storeValue = (key, value) => {
  var store = getStorageAsMap()
  store[key] = value
  saveStore(store)
}
