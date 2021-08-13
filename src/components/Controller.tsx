import React from "react";

type ControllerProps = { number: number, margin: number, threshold: number }
type ControllerState = { number: number, margin: number, threshold: number }

export class Controller extends React.PureComponent<ControllerProps, ControllerState> {
  constructor(props: ControllerProps) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.state = { number: this.props.number, margin: this.props.margin, threshold: this.props.threshold };
  }

  handleChange(e: { target: HTMLInputElement }) {
    const type = e.target.id.split("-")[0]
    const newState = { ...this.state, [type]: e.target.value }
    this.setState(newState);
  }

  render() {
    const { number, margin, threshold } = this.state
    return <section className="controller">
      <h2>Intersection Observer</h2>
      <p>This proof of concept uses the <a
        href="https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API">Interesection Observer</a> to
        determine which of the 10,000 elements on the left are in view and should be rendered.</p>
      <p>As the user scrolls, the intersection observer callback receives only those elements with changed
        <code>isInteresecting</code> status
      </p>
      <p>Zooming in and out is performant and works properly, because layout is performed by the browser engine and not
        javascript</p>
      {/* <div className="observer-option">
        <label htmlFor="threshold-value"><code>threshold</code></label>
        <input value={threshold} id="threshold-value" onChange={this.handleChange} className="value-display" />
        <input value={threshold} onChange={this.handleChange} type="range" id="threshold" name="threshold" min="0" max="1.0" step="0.1" />
      </div>

      <div className="observer-option">
        <label htmlFor="margin"><code>margin</code></label>
        <input value={margin} onChange={this.handleChange} id="margin-value" className="value-display" />
        <input value={margin} onChange={this.handleChange} type="range" id="margin" name="margin" min="0" max="100" step="1" />
      </div>

      <div className="observer-option">
        <label htmlFor="number"><code>number</code></label>
        <input value={number} onChange={this.handleChange} id="number-value" className="value-display" />
        <input value={number} onChange={this.handleChange} type="range" id="number" name="number" min="10" max="50000" step="10" />
      </div> */}

      <p id="rendered-number"></p>

      <p><a href="./">See it done with vanilla JS</a></p>
      <p><a href="https://github.com/rendall/intersection-observer-grid">Github repo</a></p>
    </section>


  }
}