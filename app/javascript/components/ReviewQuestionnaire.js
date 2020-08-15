import React from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import { Container } from 'react-bulma-components';
import { Heading } from 'react-bulma-components';
import { Section } from 'react-bulma-components';
import { Button } from 'react-bulma-components';
import { Packer } from "docx";
import { Document, Paragraph, TextRun, PageBreak, HeadingLevel, PageNumber, Header, AlignmentType } from "docx";
import { saveAs } from "file-saver";

class ReviewQuestionnaire extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sections: this.props.sections
    }

    this.generateWord = this.generateWord.bind(this)
    this.generateRedcap = this.generateRedcap.bind(this)
  }

  wordDocumentCreator(title) {
    const doc = new docx.Document({
      title: title,
      styles: {
        paragraphStyles: [
          {
            id: "normal",
            name: "normal",
            run: {
              size: 24,
            },
            paragraph: {
              spacing: {
                after: 130
              },
            }
          }
        ]
      }
    });
    doc.addSection({
      headers: {
        default: new docx.Header({
          children: [
            new docx.Paragraph({
              children: [
                new docx.TextRun({
                  font: "Times New Roman",
                  children: ["Page: ", docx.PageNumber.CURRENT],
                }),
                new docx.TextRun({
                  font: "Times New Roman",
                  children: "                                                Name or ID _____________________________"
                })
              ],
            })
          ],
        }),
      },
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
                text: "2020 Reference Calendars",
                bold: true
              }),
              new docx.PageBreak()
            ],
            style: "normal"
        }),
        new docx.Paragraph({
          text: `${title}`,
          heading: docx.HeadingLevel.TITLE,
          run: {
            size: 24
          },
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
          text: `${section[0].charAt(0).toUpperCase() + section[0].replace('_', ' ').slice(1)}`,
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
          style: "normal",
          border: {
           top: {
               color: "auto",
               value: "single",
               size: 5,
           },
           bottom: {
               color: "auto",
               value: "single",
               size: 5,
           },
           left: {
               color: "auto",
               value: "single",
               size: 5,
           },
           right: {
               color: "auto",
               value: "single",
               size: 5,
           }
         }
      })
    )
  }

  questionList(questions) {
    return (questions.map((q) => {
      if (q.answer_type == "radio" || q.answer_type == "checkbox") {
        return(
            [
              this.question(q),
              ...this.sortQuestionsWithChildren(q)
            ].reduce((prev, curr) => prev.concat(curr), [])
          )
      } else {
        return(
            [
              this.question(q),
              this.sortQuestionsWithChildren(q)
            ].reduce((prev, curr) => prev.concat(curr), [])
          )
        }
      }).reduce((prev, curr) => prev.concat(curr), [])
    )
  }

  question(q) {
    if (q.answer_type == "instructions") {
      return(
          new docx.TextRun({
          text: `${q.text}`,
          italics: true
        })
      )
    } else if (q.answer_type == "header"){
      return(
          new docx.TextRun({
            text: `${q.text}`,
            bold: true
          })
      )
    } else {
      return(
        new docx.TextRun({
          text: `${q.text}  `
        }).break()
      )
    }
  }

  sortQuestionsWithChildren(q) {
    if (q.children.length > 0){
      return(
        [
          this.answer(q),
          q.children.map((child) => {
            return(
              [
                this.question(child),
                this.answer(child)
              ]
            )
          }).reduce((prev, curr) => prev.concat(curr), [])
        ].reduce((prev, curr) => prev.concat(curr), [])
      )
    } else {
      return(
        this.answer(q)
      )
    }
  }

  answer(q) {
    if (q.answer_type == "radio" || q.answer_type == "checkbox") {
      return (q.answer_choices.map((choice) => {
          return(
            [
              new docx.TextRun({
                text: `      `,
                underline: {}
              }),
              new docx.TextRun({
                text: `${choice}      `,
              })
            ]
          )
        })
      ).reduce((prev, curr) => prev.concat(curr), [])
    } else if(q.answer_type == "text" || q.answer_type == "number") {
      return(
          new docx.TextRun({
          text: '                                                ',
          underline: {}
        })
      )
    }
    else {
      return(
          new docx.TextRun({
          text: ''
        }).break()
      )
    }
  }

  generateWord(e) {
    const title = this.props.title;
    const doc = this.wordDocumentCreator(title);
    docx.Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `${title.toLowerCase()}.docx`);
    });
  }

  generateRedcap(e) {
    return
  }

  render() {
    return(
      <Section>
        <div style={{padding: 10}}>
          <Button onClick={this.generateWord} className="button" color="primary" renderAs="a">Download Word Document</Button>
        </div>
        <div style={{padding: 10}}>
          <Button onClick={this.generateRedcap} className="button" color="primary" renderAs="a">Download Redcap Schema</Button>
        </div>
      </Section>
    )
  }
}

export default ReviewQuestionnaire
