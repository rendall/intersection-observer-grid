import * as React from "react";

const NUM = 10000

type CellProps = {
  i: number;
  observer: IntersectionObserver;
  isInView: boolean;
};

const Cell = (props: CellProps) => {
  const observeRef = (observer: IntersectionObserver) =>
    React.useCallback((node) => {
      observer.observe(node);
    }, []);
  const id = `${props.i}`;

  return (
    <article
      id={id}
      ref={observeRef(props.observer)}
      className={"cell"}
    >
      {props.isInView && <><img className="image-display" src="https://source.unsplash.com/random/160x160" /><p className="number-display">{props.i}</p></>}
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

const updateState = (state: { isInView: boolean[] }, entries: IntersectionObserverEntry[]) => {
  const replaceWithEntry = (i: number, status: boolean, entries: IntersectionObserverEntry[]) => {
    const entry = entries.find(entry => entry.target.id === `${i}`)
    if (entry) return entry.isIntersecting
    else return status
  }

  const isInView = state.isInView.map((status, i) => replaceWithEntry(i, status, entries))
  return { ...state, isInView }
}
export class VirtualGrid extends React.Component<{}, { isInView: boolean[] }> {
  observer: IntersectionObserver;
  callback: IntersectionObserverCallback = (entries, observer) => {
    const newState = updateState(this.state, entries)
    this.setState(newState);
  };

  constructor(props: {}) {
    super(props);
    this.state = { isInView: ascendingArray.map(() => false) };
    this.observer = getObserver(this.callback);
  }

  cells = () =>
    ascendingArray.map((i) => (
      <>
        {(i % 100) === 0 && <h2 key={`h${i}`}>Header {i}</h2>}
        <Cell
          isInView={this.state.isInView[i]}
          observer={this.observer}
          i={i}
          key={`${i}`}
        />
      </>
    ));

  render() {
    return <>{this.cells()}</>;
  }
}
