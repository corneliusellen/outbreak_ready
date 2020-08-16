class QuestionsController < ApplicationController
  def index
    questionnaire = Questionnaire.find(id)
    render json: format_data(questionnaire)
  end

  private

  def format_data(questionnaire)
    title = questionnaire.title
    tags = questionnaire.tags.pluck(:name)
    questions = []

    Question.includes(:children)
            .select('questions.id, questions.text, questions.answer_type, questions.answer_choices, questions.section, questions.mandatory, tags.name')
            .joins(:tags)
            .where(tags: { name: tags })
            .map{ |q| { id: q.id,
                        section: q.section,
                        text: q.text,
                        answer_type: q.answer_type,
                        answer_choices: q.answer_choices,
                        mandatory: q.mandatory,
                        tags: q.tags.map{ |tag| tag.name},
                        children: q.children.map{ |child| { id: child.id,
                                                            text: child.text,
                                                            answer_type: child.answer_type,
                                                            answer_choices: child.answer_choices,
                                                            mandatory: q.mandatory,
                                                            children: []
                                                          }
                                                }
                      }
                }.uniq.each{ |question| questions << question }

    Question.select('questions.id, questions.text, questions.answer_type, questions.answer_choices, questions.section, questions.mandatory, tags.name')
            .joins(:tags)
            .where("tags.name = ?", 'universal')
            .map{|q| { id: q.id, section: q.section, text: q.text, answer_type: q.answer_type, answer_choices: q.answer_choices, mandatory: q.mandatory, tags: q.tags.map{ |tag| tag.name}, children: q.children.map{|child| { id: child.id, section: child.section, text: child.text, answer_type: child.answer_type, answer_choices: child.answer_choices, mandatory: q.mandatory, children: [] } } } }.uniq.each{ |question| questions << question }

    tagged_questions = questions.group_by{ |q| q[:section] }
                                .map{|section,qs| [section, qs.group_by{|q| q[:mandatory]}]}
                                .to_h

    { title: title, questions: tagged_questions }
  end

  def id
    params['id']
  end
end
