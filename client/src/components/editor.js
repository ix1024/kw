import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const content = { "entityMap": {}, "blocks": [{ "key": "637gr", "text": "Initialized from content state.", "type": "unstyled", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }] };

class MyEdit extends Component {

  constructor(props) {
    super(props);
    const contentState = convertFromRaw(content);
    this.state = {
      contentState,
    }
  }

  onContentStateChange: Function = (contentState) => {
    console.log(contentState);
    this.setState({
      contentState,
    });
  };

  render() {
    return (
      <Editor
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        wrapperStyle={{background:'#fff',border:'1px solid #eee'}}
        editorStyle={{height:'200px'}}
        toolbarStyle={{}}
        onContentStateChange={this.onContentStateChange}
		/>
    );
  }
};
export default MyEdit;
