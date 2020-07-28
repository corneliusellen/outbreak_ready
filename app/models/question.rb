class Question < ApplicationRecord
  enum section: [:contact, :introduction, :screening, :exposure, :other, :symptoms, :onset_duration, :outcomes, :demographics]

  enum answer_type: [:radio, :checkbox, :text, :number, :instructions, :header]

  store :redcap_metadata, accessors: [:variable, :form_name, :section_header, :field_label, :field_note, :text_validation_type, :text_validation_min, :text_validation_max]

  has_many :taggings
  has_many :tags, through: :taggings

  has_many :questionnaire_questions
  has_many :questionnaires, through: :questionnaire_questions

  belongs_to :parent, class_name: 'Question', optional: true
  has_many :children, class_name: 'Question', foreign_key: 'parent_id', dependent: :destroy
end
