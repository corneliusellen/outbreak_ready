class QuestionnaireController < ApplicationController
  skip_before_action :verify_authenticity_token

  def update

  end

  def show
    @id = params['id']
  end
end
