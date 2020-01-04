import React, { Component} from 'react';
import { FacebookProvider, Comments } from 'react-facebook';
 
export default class CommentsFb extends Component {
  render() {
    return (
      <FacebookProvider appId="123456789">
        <Comments href="https://www.facebook.com/SonderManga-1174006802776577/" />
      </FacebookProvider>
    );
  }
}