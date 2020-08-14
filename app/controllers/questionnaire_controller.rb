class QuestionnaireController < ApplicationController
  skip_before_action :verify_authenticity_token

  def update

  end

  def show
    @id = params['id']
    questionnaire = Questionnaire.find(@id)
    @title = questionnaire.title
    # @questions = questionnaire.questions
    questions = Question.where(answer_type: 'instructions') +  Question.where(answer_type: 'checkbox')+ Question.first(3) + Question.last(3)
    @sections = questions.group_by{ |q| q.section }
  end
end
