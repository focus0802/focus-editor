import React from 'react';
import './app.css';
import FocusEditor from '../src/FocusEditor';

class App extends React.Component {
  render() {
    return (<div style={{ margin: '240px' }}>
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
      />
    </div>);
  }
}
export default App;
