module DummyData
  class Questions
    def self.all
      {
        contact: [
          {
            id: 1,
            text: "Date of interview:",
            answer_type: :checkbox,
            answer_options: ['American Indian/Alaskan Native','Asian','Black or African American','Pacific Islander/Hawaiian Native','White','Other','Unknown','Decline to answer']
          },
          {
            id: 2,
            text: "Interviewer name:",
            answer_type: :radio,
            answer_options: ['Yes', 'No']
          },
          {
            id: 3,
            text: "Name:",
            answer_type: :text,
            answer_options: ['Yes', 'No']
          },
          {
            id: 4,
            text: "Age:",
            answer_type: :number,
            answer_options: ['Yes', 'No']
          }
        ],
        instructions: [
          {
            id: 5,
            text: "Instructions for interviewer:
                   Complete one form for each individual
                   For persons under the age of 18, interview the parent/guardian
                   Mark an answer for each question. If the interviewee responds 'I don't know', mark 'Unknown'",
            answer_type: :text,
            answer_options: ['Yes', 'No']
          },
        ],
        introduction: [
          {
            id: 6,
            text: "Hello, this is [your name] from the [your agency]. I'm calling because a number of people became sick after [event/describe outbreak]. We are trying to find out what caused the outbreak. One of the ways we do that is by comparing the kinds of foods eaten by the people who got sick with those eaten by people who did not get sick. Your help is important so that we can identify what caused the outbreak and stop others from getting sick. Could I ask you a few questions?",
            answer_type: :number,
            answer_options: ['Yes', 'No']
          }
        ],
        screening: [
          {
            id: 7,
            text: "Did you attend [insert event]?",
            answer_type: :text,
            answer_options: ['Yes', 'No']
          },
          {
            id: 8,
            text: "What campsite/bunkhouse did you/your child stay at while at camp? ",
            answer_type: :number,
            answer_options: ['Yes', 'No']
          }
        ],
        onset_duration: [
          {
            id: 9,
            text: "This section is only for people who got sick. Discard or ignore for those who did not become ill.",
            answer_type: :text,
            answer_options: ['Yes', 'No']
          },
          {
            id: 10,
            text: "On what date did you first feel sick? ",
            answer_type: :number,
            answer_options: ['Yes', 'No']
          }
        ],
        outcomes: [
          {
            id: 11,
            text: "This section is only for people who got sick. Discard or ignore for those who did not become ill.",
            answer_type: :text,
            answer_options: ['Yes', 'No']
          }
        ],
        demographics: [
          {
            id: 12,
            text: "Date of birth: ",
            answer_type: :text,
            answer_options: ['Yes', 'No']
          },
          {
            id: 13,
            text: "Occupation:",
            answer_type: :number,
            answer_options: ['Yes', 'No']
          }
        ],
        exposure: [
          {
            id: 14,
            text: "drink water from the tap (faucet)",
            answer_type: :text,
            answer_options: ['Yes', 'No']
          },
          {
            id: 15,
            text: "drink water from anywhere else (other than tap water)",
            answer_type: :number,
            answer_options: ['Yes', 'No']
          }
        ],
        symptoms: [],
        other: []
      }
    end
  end
end
