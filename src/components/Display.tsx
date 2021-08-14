import * as React from "react";

const NUM = 10000;

type CellProps = {
  i: number;
  observer: IntersectionObserver;
  isInView: boolean;
};

const Cell = (props: CellProps) => {
  const observeRef = (observer: IntersectionObserver) =>
    React.useCallback(
      (node) => {
        observer.observe(node);
      },
      [observer]
    );

  const id = `${props.i}`;

  return (
    <article
      id={id}
      ref={observeRef(props.observer)}
      className={"cell is-react"}
    >
      {props.isInView && (
        <>
          <img
            className="image-display"
            src={`https://source.unsplash.com/random/160x160?${props.i}`}
          />
          <p className="number-display">{props.i}</p>
        </>
      )}
    </article>
  );
};

const ascendingArray = new Array(NUM).fill(0).map((c, i) => i);
const getObserver = (callback: IntersectionObserverCallback) =>
  new IntersectionObserver(callback, {
    root: document.querySelector(".view"),
    rootMargin: "0%",
    threshold: 1.0,
  });

const updateState = (
  state: { isInView: boolean[] },
  entries: IntersectionObserverEntry[]
) => {
  const replaceWithEntry = (
    i: number,
    status: boolean,
    entries: IntersectionObserverEntry[]
  ) => {
    const entry = entries.find((entry) => entry.target.id === `${i}`);
    if (entry) return entry.isIntersecting;
    else return status;
  };

  const isInView = state.isInView.map((status, i) =>
    replaceWithEntry(i, status, entries)
  );
  return { ...state, isInView };
};
export class Display extends React.Component<{}, { isInView: boolean[] }> {
  observer: IntersectionObserver;
  callback: IntersectionObserverCallback = (entries, observer) => {
    const newState = updateState(this.state, entries);
    this.setState(newState);
  };

  constructor(props: {}) {
    super(props);
    this.state = { isInView: ascendingArray.map(() => false) };
    this.observer = getObserver(this.callback);
  }

  getHeader = (i: number): JSX.Element => <h2 key={`h${i}`}>Header {i}</h2>;

  // Create display cells
  cells = () =>
    ascendingArray.map((i) => (
      <Cell
        isInView={this.state.isInView[i]}
        observer={this.observer}
        i={i}
        key={`${i}`}
      />
    ));

  // Add headers
  list = () =>
    this.cells().reduce<JSX.Element[]>(
      (items, item, i) =>
        i % 100 ? [...items, item] : [...items, this.getHeader(i), item],
      []
    );

  render() {
    return <section className={"display"}>{this.list()}</section>;
  }
}
