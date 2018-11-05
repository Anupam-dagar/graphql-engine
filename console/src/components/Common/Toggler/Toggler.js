import React, { Component } from 'react';

class Toggler extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input_textarea: 0,
      input_value: '',
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    const newProps = this.props.standardProps;
    delete newProps.defaultValue;
    this.setState({ properties: newProps });
  }

  handleClick(e) {
    e.preventDefault();
    const stateValue = this.state.input_textarea;
    if (stateValue === 0) {
      this.setState({ input_textarea: 1 });
    } else {
      this.setState({ input_textarea: 0 });
    }
  }

  handleChange(e) {
    console.log('called');
    const inputVal = e.target.value;
    this.setState({ input_value: inputVal });
  }

  render() {
    console.log(this.state);
    return (
      <span onChange={this.handleChange}>
        {this.state.input_textarea === 1 ? (
          <textarea
            value={this.state.input_value}
            {...this.state.properties}
            placeholder={this.props.placeholderProp}
            rows="10"
            cols="10"
          />
        ) : (
          <input
            value={this.state.input_value}
            {...this.state.properties}
            placeholder={this.props.placeholderProp}
          />
        )}
        <button onClick={this.handleClick}>Toggle</button>
      </span>
    );
  }
}

Toggler.propTypes = {
  data: React.PropTypes.string.isRequired,
};

export default Toggler;
