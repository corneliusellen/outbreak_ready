module DummyData
  class Questions
    def self.all
      {
        contact: [
          {
            id: 1,
            text: "Date of interview:",
            answer_type: 'text'
          },
          {
            id: 2,
            text: "Interviewer name:",
            answer_type: 'text'
          },
          {
            id: 3,
            text: "Name:",
            answer_type: 'text'
          },
          {
            id: 4,
            text: "Age:",
            answer_type: 'text'
          }
        ],
        instructions: [
          {
            id: 5,
            text: "Instructions for interviewer:
                   Complete one form for each individual
                   For persons under the age of 18, interview the parent/guardian
                   Mark an answer for each question. If the interviewee responds 'I don't know', mark 'Unknown'",
            answer_type: 'instructions'
          },
        ],
        introduction: [
          {
            id: 6,
            text: "Hello, this is [your name] from the [your agency]. I'm calling because a number of people became sick after [event/describe outbreak]. We are trying to find out what caused the outbreak. One of the ways we do that is by comparing the kinds of foods eaten by the people who got sick with those eaten by people who did not get sick. Your help is important so that we can identify what caused the outbreak and stop others from getting sick. Could I ask you a few questions?",
            answer_type: 'instructions'
          }
        ],
        screening: [
          {
            id: 7,
            text: "Did you attend [insert event]?",
            answer_type: 'radio',
            answer_options: ['Yes', 'No']
          },
          {
            id: 8,
            text: "What campsite/bunkhouse did you/your child stay at while at camp? ",
            answer_type: 'radio',
            answer_options: ['Bunkhouse 1', 'Bunkhouse 2']
          }
        ],
        onset_duration: [
          {
            id: 9,
            text: "This section is only for people who got sick. Discard or ignore for those who did not become ill.",
            answer_type: 'instructions'
          },
          {
            id: 10,
            text: "On what date did you first feel sick? ",
            answer_type: 'text'
          }
        ],
        outcomes: [
          {
            id: 11,
            text: "This section is only for people who got sick. Discard or ignore for those who did not become ill.",
            answer_type: 'instructions'
          }
        ],
        demographics: [
          {
            id: 12,
            text: "Date of birth: ",
            answer_type: 'text'
          },
          {
            id: 13,
            text: "Occupation:",
            answer_type: 'text'
          }
        ],
        exposure: [
          {
            id: 14,
            text: "drink water from the tap (faucet)",
            answer_type: 'radio',
            answer_options: ['Yes', 'No']
          },
          {
            id: 15,
            text: "drink water from anywhere else (other than tap water)",
            answer_type: 'radio',
            answer_options: ['Yes', 'No']
          }
        ],
        symptoms: [
          {
            id: 15,
            text: "Let me read you a list of symptoms. For each one, give me a 'yes' or a 'no'. Did you have any...",
            answer_type: 'parent',
            answer_options: [
              {
                id: 16,
                text: "headache",
                answer_type: 'radio',
                answer_options: ['Yes', 'No', 'Unknown']
              },
              {
                id: 17,
                text: "nausea",
                answer_type: 'radio',
                answer_options: ['Yes', 'No', 'Unknown']
              },
              {
                id: 18,
                text: "vomitting",
                answer_type: 'radio',
                answer_options: ['Yes', 'No', 'Unknown']
              },
              {
                id: 19,
                text: "myalgia (muscle aches)",
                answer_type: 'radio',
                answer_options: ['Yes', 'No', 'Unknown']
              },
              {
                id: 20,
                text: "abdominal (stomach, belly) cramps",
                answer_type: 'radio',
                answer_options: ['Yes', 'No', 'Unknown']
              },
              {
                id: 21,
                text: "unusual fatigue (feeling tired)",
                answer_type: 'radio',
                answer_options: ['Yes', 'No', 'Unknown']
              },
            ]
          }
        ],
        other: []
      }
    end
  end
end
