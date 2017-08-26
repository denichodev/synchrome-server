import React, { Component } from 'react';

class ContentWrapper extends Component {
  render() {
    return (
      <div className="content-wrapper">
        <section className="content-header"></section>
        <section className="content">
          {this.props.children}
        </section>
      </div>
    );
  }
}

export default ContentWrapper;