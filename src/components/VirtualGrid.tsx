import * as React from "react";

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
      key={props.i}
    >
      {props.isInView ? <p>is in view</p> : <p>{props.i}</p>}
    </article>
  );
};

const ascendingArray = new Array(100).fill(0).map((c, i) => i);
const getObserver = (callback: IntersectionObserverCallback) =>
  new IntersectionObserver(callback, {
    root: document.querySelector(".view"),
    rootMargin: "0%",
    threshold: 1.0,
  });


  const updateState = (state:{isInView:boolean[]}, entries:IntersectionObserverEntry[]) => {

    // replace `isInView` elements with those in entries 
    const replaceWithEntry = ( i:number, status:boolean, entries:IntersectionObserverEntry[]) => {
      const entry = entries.find( entry => entry.target.id === `${i}`)
      if (entry) return entry.isIntersecting
      else return status
    }

    const isInView = state.isInView.map( (status, i) => replaceWithEntry(i, status, entries))
    return {...state, isInView}
  }
export class VirtualGrid extends React.Component<{}, { isInView: boolean[] }> {
  observer: IntersectionObserver;
  callback: IntersectionObserverCallback = (entries, observer) => {

    const newState = updateState(this.state, entries)

    console.log({ entries, newState, state: this.state });
    
    this.state = newState;
    // entries.forEach((entry) =>
    //   entry.isIntersecting
    //     ? entry.target.classList.add("is-view")
    //     : entry.target.classList.remove("is-view")
    // );
  };

  constructor(props: {}) {
    super(props);
    this.state = { isInView: ascendingArray.map(() => false) };
    this.observer = getObserver(this.callback);
  }

  cells = () =>
    ascendingArray.map((i) => (
      <Cell
        isInView={this.state.isInView[i]}
        observer={this.observer}
        i={i}
        key={i}
      />
    ));

  render() {
    return <>{this.cells()}</>;
  }
}
