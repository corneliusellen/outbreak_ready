module DummyData
  class Questions
    def self.all
      {
        interview: [
          {
            id: 1,
            text: "What is your race?",
            answer_type: :checkbox,
            answer_options: ['American Indian/Alaskan Native','Asian','Black or African American','Pacific Islander/Hawaiian Native','White','Other','Unknown','Decline to answer']
          },
          {
            id: 2,
            text: "Did you attend the Piggly Wiggly tasting event?",
            answer_type: :radio,
            answer_options: ['Yes', 'No']
          }
        ],
        contact: [
          {
            id: 3,
            text: "If yes, on which day?",
            answer_type: :text
          },
          {
            id: 4,
            text: "How many other people did you eat with?",
            answer_type: :number
          }
        ]
      }
    end
  end
end
