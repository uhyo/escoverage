(() => {
  const toc = document.querySelector("#menu-toc > ol.toc");
  const obj = Object.fromEntries(listChildren(toc))
  console.log(obj);

  function listChildren(list) {
    const lis = Array.from(list.querySelectorAll(":scope > li"));
    return lis.flatMap(li => {
      const a = li.querySelector(":scope > a");
      const match = a.hash.match(/^#(.+)$/);
      if (!match) {
        return [];
      }
      const sectionId = match[1];
      const sectionName = a.textContent;

      const subToc = li.querySelector(":scope > ol.toc");
      return [[sectionId, sectionName]].concat(
        subToc ? listChildren(subToc) : []
      );
    });
  }
})();