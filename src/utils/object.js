// Object and array utility helper

export function filterItems(key, needle, heystack) {
  let query = needle.toLowerCase();
  return heystack.filter(item => item[key].toLowerCase().indexOf(query) >= 0);
}

