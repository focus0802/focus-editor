import React from 'react';
import FocusEditor from '../src/FocusEditor';

class App extends React.Component {
  render() {
    return (<div style={{ margin: '240px' }}>
      <FocusEditor
        onAudioUpload={(file, fileList, callback) => {
          callback('http://ip.h5.rc03.sycdn.kuwo.cn/80bf9b8943f17f079e4c42e53dcc58ae/591ec41f/resource/a2/4/18/2144584884.aac');
        }}
      />
    </div>);
  }
}
export default App;
