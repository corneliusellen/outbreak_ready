require 'csv'

module Services
  class CsvImporter
    def initialize(file_contents)
      @file_contents = file_contents
    end

    def import!
      CSV.parse(file_contents, headers: true, header_converters: :symbol).each do |row|
        id = row[:id]
        section = row[:section].gsub(/[0-9]/,'').downcase
        text = row[:question]
        mandatory = row[:mandatory] == 'Y' ? true : false
        answer_type = row[:field_type]&.downcase
        answer_choices = row[:choices_calculations_or_slider_labels]&.split('|')
        csv_tags = [row[:tag1],row[:tag2],row[:tag3],row[:tag4],row[:tag5],row[:tag6]].compact
        parent_id = row[:question_group]
        redcap_metadata = {
                            variable_field_name: row[:variable_field_name],
                            form_name: row[:form_name],
                            sectionheader: row[:sectionheader],
                            field_label: row[:field_label],
                            field_note: row[:field_note],
                            text_validation_type_or_show_slider_number: row[:text_validation_type_or_show_slider_number],
                            text_validation_min: row[:text_validation_min],
                            text_validation_max: row[:text_validation_max],
                            identifier: row[:identifier],
                            branching_logic_show_field_only_if: row[:branching_logic_show_field_only_if],
                            required_field: row[:required_field],
                            custom_alignment: row[:custom_alignment],
                            question_number_surveys_only: row[:question_number_surveys_only],
                            matrix_group_name: row[:matrix_group_name],
                            matrix_ranking: row[:matrix_ranking],
                            field_annotation: row[:field_annotation]
                          }

        question = Question.create!(id: id,
                                    section: section,
                                    text: text,
                                    mandatory: mandatory,
                                    answer_type: answer_type,
                                    answer_choices: answer_choices,
                                    redcap_metadata: redcap_metadata)

        question.update!(parent_id: parent_id) if parent_id.present?

        next unless !csv_tags.empty?

        csv_tags.each do |csv_tag|
          tag = Tag.find_by(name: csv_tag)
          if tag
            Tagging.create!(tag: tag, question: question)
          # TODO handle errors here
          else
            puts "Question does not have valid tag: #{csv_tag}"
          end
        end
      end

      true

    rescue StandardError
      false
    end

    private

    attr_reader :file_contents

  end
end
