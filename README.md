This is a proof of concept for handling grid layout and scrolling for potentially thousands of expensive-to-render elements or components.

Each component has two modes, a _placeholder_ mode that is minimal, and a _render_ mode that is fully rendered.

Ideally, the user will never see the _placeholder_ mode, and will just think it is a long scroll of components in _render_ mode. In practice, there is some delay.

The demo is here: <https://rendall.github.io/intersection-observer-grid/>

React version here: <https://rendall.github.io/intersection-observer-grid/react.html>
