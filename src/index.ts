const createArticle = (i: number) => {
  const article = document.createElement("article");
  article.classList.add("cell");

  const imageDisplay = document.createElement("img") as HTMLImageElement;
  imageDisplay.src = `https://source.unsplash.com/random/160x160?${i}`;
  imageDisplay.classList.add("image-display");
  imageDisplay.loading = "lazy";

  article.appendChild(imageDisplay);

  const numberDisplay = document.createElement("p");
  numberDisplay.innerText = `${i}`;
  numberDisplay.classList.add("number-display");
  article.appendChild(numberDisplay);

  const view = document.querySelector(".display");
  view?.appendChild(article);
  return article;
};
const createHeader = (i: number) => {
  const h2 = document.createElement("h2");
  h2.innerText = `Header ${i}`;
  const view = document.querySelector(".display");
  view?.appendChild(h2);
};
const makeDivs = (observer: IntersectionObserver) => {
  document.querySelector(".display")!.innerHTML = "";
  const numElements = parseInt(
    (document.getElementById("number-value") as HTMLInputElement)?.value ??
      10000
  );

  new Array(numElements)
    .fill(0)
    .map((z, i) => i)
    .forEach((i) => {
      if (i % 100 === 0) createHeader(i);
      const article = createArticle(i);
      observer.observe(article);
    });
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

    const renderedNum = document.querySelectorAll(".is-view").length;

    document.getElementById(
      "rendered-number"
    )!.innerText = `${renderedNum} elements rendered`;
  };

  const rootMargin = `${
    (document.getElementById("margin-value") as HTMLInputElement).value ?? 0
  }%`;

  const threshold = parseInt(
    (document.getElementById("threshold-value") as HTMLInputElement).value ?? 0
  );

  const observer = new IntersectionObserver(callback, {
    root: document.querySelector(".display"),
    rootMargin,
    threshold,
  });

  makeDivs(observer);

  const toggleView = document.querySelector(
    "#toggle-view"
  ) as HTMLButtonElement;
  toggleView.addEventListener("click", () => {
    document.querySelector(".display")!.classList.toggle("list-view");
  });
};

setup();
