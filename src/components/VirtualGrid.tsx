import * as React from 'react';

const cells = (new Array(100)).fill(0).map( ( e, i ) => <article className={"cell"} key={i}>{i}</article>)

export class VirtualGrid extends React.Component {
  state: { cells: { i: number }[] } = {cells:[]}
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <>
      {cells}
      </>
    );
  }
}