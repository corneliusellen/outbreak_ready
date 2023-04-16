require 'csv'

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

  scope :standard, -> { joins(:tags).where("tags.name = ?", "universal") }

  HEADERS = [
              'Variable / Field Name',
              'Form Name',
              'Field Type',
              'SectionHeader',
              'Field Label',
              'Choices, Calculations, OR Slider Labels',
              'Field Note',
              'Text Validation Type OR Show Slider Number',
              'Text Validation Min',
              'Text Validation Max',
              'Identifier?',
              'Branching Logic (Show field only if...)',
              'Required Field?',
              'Custom Alignment',
              'Question Number (surveys only)',
              'Matrix Group Name',
              'Matrix Ranking?',
              'Field Annotation'
            ]

  def self.to_csv(questionnaire_title)
    CSV.generate(headers: true) do |csv|
      csv << HEADERS
      csv << ['contact_id',"#{questionnaire_title}",'text','','Contact ID']
      all.each do |q|
        csv << self.map_redcap_attributes(q, questionnaire_title)
      end
    end
  end

  def self.all_to_csv
    CSV.generate(headers: true) do |csv|
      csv << HEADERS
      all.each do |q|
        csv << self.map_redcap_attributes(q, nil)
      end
    end
  end

  private

  def self.map_redcap_attributes(q, questionnaire_title)
    [
      q.redcap_metadata["variable_field_name"],
      questionnaire_title,
      self.field_type(q),
      q.redcap_metadata["sectionheader"],
      q.text,
      self.answer_choices(q),
      q.redcap_metadata["field_note"],
      q.redcap_metadata["text_validation_type_or_show_slider_number"],
      q.redcap_metadata["text_validation_min"],
      q.redcap_metadata["text_validation_max"],
      q.redcap_metadata["branching_logic_show_field_only_if"],
      q.redcap_metadata["required_field"],
      q.redcap_metadata["custom_alignment"],
      q.redcap_metadata["question_number_surveys_only"],
      q.redcap_metadata["matrix_group_name"],
      q.redcap_metadata["matrix_ranking"],
      q.redcap_metadata["field_annotation"],
      q.redcap_metadata["field_note"]
    ]
  end

  def self.field_type(q)
    case q.answer_type
    when 'instructions', 'header'
      'descriptive'
    when 'text', 'number'
      'text'
    when 'checkbox'
      'checkbox'
    when 'radio'
      'radio'
    end
  end

  def self.answer_choices(q)
    q.answer_choices&.join("|") || ""
  end
end
