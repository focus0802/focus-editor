import React from 'react';
import { Form, Button } from 'antd';
import './app.css';
import FocusEditor from '../src/FocusEditor';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        value: `<figure><img width="100%"
src="https://img.96tyw.com/uploads/20170519/14951630307597.jpg" /></figure>`,
      });
    }, 1000);
  }

  render() {
    return (<div style={{ margin: '240px' }}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
              console.log(values);
            }
          });
        }}
      >
        <Form.Item
          label="内容"
          hasFeedback
        >
          {this.props.form.getFieldDecorator('content', {
            rules: [
              {
                required: true,
                message: '内容不能为空',
              },
            ],
            initialValue: this.state.value,
          })(
            <FocusEditor
              onAudioUpload={(file, fileList, callback) => {
                callback('http://ip.h5.rc03.sycdn.kuwo.cn/80bf9b8943f17f079e4c42e53dcc58ae/591ec41f/resource/a2/4/18/2144584884.aac');
              }}
              onImageUpload={(file, fileList, callback) => {
                callback('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495217144587&di=24da7bc2794f3d602279fe35cf8a287b&imgtype=0&src=http%3A%2F%2Fimg.tupianzj.com%2Fuploads%2Fallimg%2F160527%2F9-16052F93601.jpg');
              }}
              onVideoUpload={(file, fileList, callback) => {
                callback('http://www.w3school.com.cn/i/movie.ogg');
              }}
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">保存</Button>
        </Form.Item>
      </Form>
    </div>);
  }
}
export default Form.create()(App);
