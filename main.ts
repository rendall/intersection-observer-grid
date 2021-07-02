const createArticle = (i: number) => {
  const article = document.createElement("article");
  article.classList.add("cell");
  const number = document.createElement("p")
  number.innerText = `${i}`;
  number.classList.add("number")
  article.appendChild(number)

  const view = document.querySelector(".view");
  view?.appendChild(article);
  return article;
};
const createHeader = (i: number) => {
  const h2 = document.createElement("h2");
  h2.innerText = `Header ${i}`;
  const view = document.querySelector(".view");
  view?.appendChild(h2);
};
const makeDivs = (observer: IntersectionObserver) => {
  for (let i = 0; i < 10000; i++) {
    if (i % 100 === 0) createHeader(i);
    const article = createArticle(i);
    observer.observe(article);
  }
};

const allCells = () =>
  Array.from<HTMLDivElement>(document.querySelectorAll(".cells"));

const load = () => {
  const options = {
    root: document.querySelector(".view"),
    rootMargin: "20%",
    threshold: 0.1,
  };

  const callback: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach((entry) =>
      entry.isIntersecting
        ? entry.target.classList.add("is-view")
        : entry.target.classList.remove("is-view")
    );
    console.log({ entries });
  };

  const observer = new IntersectionObserver(callback, options);
  makeDivs(observer);
};
load();
