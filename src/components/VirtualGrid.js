import * as React from 'react';
import { Cell } from "./Cell";
export class VirtualGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = (new Array(100)).map((e, i) => ({ i }));
    }
    render() {
        const cells = this.state.map(e => React.createElement(Cell, null));
        return ({ cells });
    }
}
