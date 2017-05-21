import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'antd';
import './color-picker.css';

class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const regexp = new RegExp(/^([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/);
    const available = regexp.exec(this.state.color);
    return this.props.visible ? (
      <div className="focus-color-picker">
        <div className="focus-color-picker-header">预设</div>
        <div className="focus-color-picker-list">
          {this.props.colors.map((color) => {
            return (<div
              className="focus-color-picker-list-item"
              key={color}
              style={{ backgroundColor: color }}
              onClick={() => {
                this.props.onChange(color);
              }}
            />);
          })}
        </div>
        <div className="focus-color-picker-header">自定义</div>
        <div className="focus-color-picker-custom">
          <Input.Group
            compact
          >
            <div
              className="focus-color-picker-custom-color"
              style={{ backgroundColor: available && `#${this.state.color}` }}
            />
            <Input
              style={{ width: 90, fontSize: 14 }}
              size="default"
              value={this.state.color}
              onChange={(e) => {
                this.setState({ color: e.target.value });
              }}
              placeholder="FFFFFF"
              prefix={<span>#</span>}
            />
            <Button
              type="primary"
              size="default"
              disabled={!available}
              onClick={() => {
                this.props.onChange(this.state.color);
              }}
            >确定</Button>
          </Input.Group>
        </div>
      </div>
    ) : null;
  }
}
ColorPicker.propTypes = {
  visible: PropTypes.bool.isRequired,
  colors: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};
ColorPicker.defaultProps = {
  colors: ['red', 'blue', 'black', 'yellow', 'green', 'skyblue', 'white', '#108ee9'],
};
export default ColorPicker;
