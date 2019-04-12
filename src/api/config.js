export const config = {
  usdaUrlSearch: (format, searchText, sortOrder, maxItems, offset, foodGroup = '') =>(`https://api.nal.usda.gov/ndb/search/?format=${format}&q=${searchText}&sort=${sortOrder}&max=${maxItems}&offset=${offset}${'&fg='+foodGroup}&api_key=${process.env.USDA_API_KEY}`),
  usdaNutritionSearch: (ndbno, type, format) =>(`https://api.nal.usda.gov/ndb/V2/reports/?ndbno=${ndbno}&type=${type}&format=${format}&api_key=${process.env.USDA_API_KEY}`),
  usdaLists: (lt, max, offset, sort, format) => (`https://api.nal.usda.gov/ndb/list?format=${format}&lt=${lt}&max=${max}&offset=${offset}&sort=${sort}&api_key=${process.env.USDA_API_KEY}`)
}