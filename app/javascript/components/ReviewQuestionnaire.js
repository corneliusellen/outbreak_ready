import React from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import { Packer } from "docx";
import { Document } from "docx";
import { saveAs } from "file-saver";

class ReviewQuestionnaire extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }

    this.generate = this.generate.bind(this)
  }

  generate(e) {
    const title = this.props.title;
    const doc = new docx.Document({
      title: title,
    });
    docx.Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `${title.toLowerCase()}.docx`);
    });
  }

  render() {
    return(
      <section class="section">
        <button onClick={this.generate}>Download Word Document</button>
      </section>
    )
  }
}

export default ReviewQuestionnaire
