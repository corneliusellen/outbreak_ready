class QuestionnaireController < ApplicationController
  skip_before_action :verify_authenticity_token

  def update
    questionnaire = Questionnaire.find(required_params[:id])
    questionnaire.questionnaire_questions.destroy_all
    question_ids = required_params[:questionnaire_questions].flatten.map{ |qq| qq[:id] }
    question_ids.each{ |id| QuestionnaireQuestion.create!(question_id: id, questionnaire_id: questionnaire.id) }
  end

  def show
    sleep 2
    @id = params['id']
    questionnaire = Questionnaire.find(@id)
    @title = questionnaire.title
    questions = questionnaire.questions.includes(:children)
    mapped_with_children = questions.map{ |q| { section: q.section,
                                                text: q.text,
                                                answer_type: q.answer_type,
                                                answer_choices: q.answer_choices,
                                                children: q.children.map{ |child| { text: child.text,
                                                                                    answer_type: child.answer_type,
                                                                                    answer_choices: child.answer_choices,
                                                                                    children: []
                                                                                  }}}}
    @sections = mapped_with_children.group_by{ |q| q[:section] }
  end

  private

  def required_params
    params.permit!
  end
end
