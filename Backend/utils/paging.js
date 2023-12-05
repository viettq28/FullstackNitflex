const paging = (list, page) => {
  const totalPages = Math.ceil(list.length/20);
  const start = 20*(page-1);
  const end = start + 19;
  const result = list.slice(start, end);
  return [totalPages, result];
}

module.exports = paging;