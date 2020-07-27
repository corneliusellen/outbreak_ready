class QuestionsController < ApplicationController
  def index
    questionnaire = Questionnaire.find(id)
    render json: format_data(questionnaire)
  end

  private

  def format_data(questionnaire)
    title = questionnaire.title
    tags = questionnaire.tags
    questions = []
    tags.each do |tag|
      enum = tag_name_to_number(tag.name)
      questions << Question.select('questions.id, questions.text, questions.answer_type, questions.answer_choices, questions.section').joins(:tags).where("tags.name = ?", enum).to_a
    end

    tagged_questions = questions.flatten.group_by{|q| q.section}
    { title: title, questions: tagged_questions }
  end

  def id
    params['id']
  end

  def tag_name_to_number(tag)
    Tag.names[tag]
  end
end
