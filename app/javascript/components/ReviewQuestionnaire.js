import React from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import { Packer } from "docx";
import { Document, Paragraph, TextRun, PageBreak, HeadingLevel } from "docx";
import { saveAs } from "file-saver";

class ReviewQuestionnaire extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sections: this.props.sections
    }

    this.generate = this.generate.bind(this)
  }

  wordDocumentCreator(title) {
    const doc = new docx.Document({
      title: title,
      styles: {
        paragraphStyles: [
          {
            id: "normal",
            name: "normal",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            paragraph: {
              spacing: {
                  after: 120
              },
            }
          },
          {
            id: "normalBold",
            basedOn: "Body",
            next: "Normal",
            run: {
              bold: true
            },
            paragraph: {
              spacing: {
                  after: 120
              },
            }
          }
        ]
      }
    });
    doc.addSection({
        children: [
          new docx.Paragraph({
            text: `${title}`,
            heading: docx.HeadingLevel.HEADING_1,
          }),
          new docx.Paragraph({
              children: [
                new docx.TextRun({
                  text: "Your customized questionnaire starts on the next page. Modify this questionnaire to fit your needs. Copy the reference calendars below as needed. Delete this page before creating a final PDF questionnaire."
                }),
              ],
              style: "normal"
          }),
          new docx.Paragraph({
              children: [
                new docx.TextRun({
                  text: "2020 Reference Calendars"
                }),
                new docx.PageBreak()
              ],
              style: "normalBold"
          }),
          ...this.mapSections(),
        ],
    });

    return doc;
  }

  mapSections() {
    return(
      Object.entries(this.state.sections).map((section) => {
        return this.section(section)
      }).reduce((prev, curr) => prev.concat(curr), [])
    )
  }

  section(section) {
    return(
      [
        new docx.Paragraph({
          text: `${section[0]}`,
          heading: docx.HeadingLevel.HEADING_1,
        }),
        this.sectionQuestions(section[1])
      ]
    )
  }

  sectionQuestions(questions) {
    return(
      new docx.Paragraph({
          children: this.questionList(questions),
          style: "normalBold",
          border: {
           top: {
               color: "auto",
               space: 1,
               value: "single",
               size: 6,
           },
           bottom: {
               color: "auto",
               space: 1,
               value: "single",
               size: 6,
           },
           left: {
               color: "auto",
               space: 1,
               value: "single",
               size: 6,
           },
           right: {
               color: "auto",
               space: 1,
               value: "single",
               size: 6,
           }
         }
      })
    )
  }

  questionList(questions) {
    return (questions.map((q) => {
        return(
          [
            this.question(q),
            this.answer(q)
          ]
        )
      }).reduce((prev, curr) => prev.concat(curr), [])
    )
  }

  question(q) {
    if (q.answer_type == "instructions") {
      return(
          new docx.TextRun({
          text: `${q.text}`,
          italics: true
        }).break()
      )
    } else {
      return(
        new docx.TextRun({
          text: `${q.text}`
        }).break()
      )
    }
  }

  answer(q) {
    if (q.answer_type == "text" || q.answer_type == "number") {
      return(
          new docx.TextRun({
          text: '                                                ',
          underline: {}
        })
      )
    } else if(q.answer_type == "header") {

    } else if(q.answer_type == "radio") {

    } else if(q.answer_type == "checkbox") {

    }
  }

  generate(e) {
    const title = this.props.title;
    const doc = this.wordDocumentCreator(title);
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
