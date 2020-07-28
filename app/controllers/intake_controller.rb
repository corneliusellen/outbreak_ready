class IntakeController < ApplicationController
  skip_before_action :verify_authenticity_token

  def new
    questionnaire = Questionnaire.create!
    @id = questionnaire.id
  end

  def create
    questionnaire = Questionnaire.find(id)

    questionnaire.update(title: title)
    create_intakes(questionnaire)
  end

  private

  def create_intakes(questionnaire)
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
