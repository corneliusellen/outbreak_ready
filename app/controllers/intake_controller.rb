class IntakeController < ApplicationController
  skip_before_action :verify_authenticity_token

  def new
    questionnaire = Questionnaire.create!
    @id = questionnaire.id
    @sections  = mapped_with_children(Question.all.standard).group_by{ |q| q[:section] }
  end

  def create
    questionnaire = Questionnaire.find(id)

    questionnaire.update(title: title)
    create_intakes(questionnaire)
  end

  private

  def mapped_with_children(questions)
    questions.map{ |q| { section: q.section,
                                                text: q.text,
                                                answer_type: q.answer_type,
                                                answer_choices: q.answer_choices,
                                                children: q.children.map{ |child| { text: child.text,
                                                                                    answer_type: child.answer_type,
                                                                                    answer_choices: child.answer_choices,
                                                                                    children: []
                                                                                  }}}}
  end

  def create_intakes(questionnaire)
    questionnaire.intakes.destroy_all
    selected_tags.each do |selected_tag|
      tag = Tag.find_by_name(selected_tag)
      questionnaire.intakes.create!(tag: tag)
    end
  end

  def selected_tags
    params['tags']
  end

  def title
    params['title']
  end

  def id
    params['id']
  end
end
