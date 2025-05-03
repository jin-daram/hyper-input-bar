const React = require('react');
const InputBar = require('./ui/InputBar');

exports.decorateTerm = (Term) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { value: '' };
      this.history = [];
      this.historyIndex = -1;
      this.inputRef = React.createRef();
    }

    // handleInputFocus = () => {
    //   this.props.onData?.('\x03'); // Ctrl+C
    // };

    handleChange = (e) => {
      this.setState({ value: e.target.value });
      this.historyIndex = this.history.length;
    };

    handleKeyDown = (e) => {
      const command = this.state.value.trim();

      if (e.key === 'Enter') {
        if (command) {
          this.props.onData(command + '\n');
          this.history.push(command);
          this.historyIndex = this.history.length;
        }
        this.setState({ value: '' });
        e.preventDefault();
      }

      if (e.key === 'ArrowUp') {
        if (this.historyIndex > 0) {
          this.historyIndex -= 1;
          this.setState({ value: this.history[this.historyIndex] });
        }
        e.preventDefault();
      }

      if (e.key === 'ArrowDown') {
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex += 1;
          this.setState({ value: this.history[this.historyIndex] });
        } else {
          this.historyIndex = this.history.length;
          this.setState({ value: '' });
        }
        e.preventDefault();
      }
    };

    render() {
      return React.createElement('div', {
        style: {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }
      }, [
        React.createElement('div', {
          style: {
            flexGrow: 1,
            minHeight: 0,
            overflow: 'hidden',
          }
        }, React.createElement(Term, this.props)),

        InputBar({
          value: this.state.value,
          onChange: this.handleChange,
          onKeyDown: this.handleKeyDown,
          inputRef: this.inputRef,
        }),
      ]);
    }
  };
};
