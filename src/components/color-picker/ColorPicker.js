import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import './color-picker.css';

class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return this.props.visible ? (
      <div
        className="focus-color-picker"
      >
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
        <Button
          size="small"
          onClick={() => {
            this.props.onChange();
          }}
          type="dashed"
          style={{ marginTop: 8, width: '100%' }}
        >自动</Button>
      </div>
    ) : null;
  }
}
ColorPicker.propTypes = {
  visible: PropTypes.bool.isRequired,
  colors: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default ColorPicker;
