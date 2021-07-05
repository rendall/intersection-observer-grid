const createArticle = (i: number) => {
  const article = document.createElement("article");
  article.classList.add("cell");
  const number = document.createElement("p");
  number.innerText = `${i}`;
  number.classList.add("number");
  article.appendChild(number);

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
  document.querySelector(".view")!.innerHTML = "";
  const numElements = parseInt(
    (document.getElementById("number-value") as HTMLInputElement)?.value ??
      10000
  );

  for (let i = 0; i < numElements; i++) {
    if (i % 100 === 0) createHeader(i);
    const article = createArticle(i);
    observer.observe(article);
  }
};

const onSliderInput = (input: HTMLInputElement) => {
  const id = `${input.id}-value`;
  const output = document.getElementById(id) as HTMLInputElement;
  output.value = input.value;
};
const onSliderChange = (e: InputEvent) => setup();

const setup = () => {
  const allCells = () =>
    Array.from<HTMLDivElement>(document.querySelectorAll(".cells"));
  const callback: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach((entry) =>
      entry.isIntersecting
        ? entry.target.classList.add("is-view")
        : entry.target.classList.remove("is-view")
    );

    const renderedNum = document.querySelectorAll(".is-view").length

    document.getElementById("rendered-number")!.innerText = `${renderedNum} elements rendered`
    console.log(`${renderedNum} elements rendered`)

  };

  const rootMargin = `${
    (document.getElementById("margin-value") as HTMLInputElement).value ?? 0
  }%`;
  const threshold = parseInt(
    (document.getElementById("threshold-value") as HTMLInputElement).value ?? 0
  );

  console.log("observer options", { rootMargin, threshold });

  const observer = new IntersectionObserver(callback, {
    root: document.querySelector(".view"),
    rootMargin,
    threshold,
  });

  makeDivs(observer);
};

setup();
