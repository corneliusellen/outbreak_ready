class Questionnaire < ApplicationRecord
  has_many :questionnaire_questions
  has_many :questions, through: :questionnaire_questions

  has_many :intakes
  has_many :tags, through: :intakes
end
