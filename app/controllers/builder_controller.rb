class BuilderController < ApplicationController
  def index
    @questions = DummyData::Questions.all
  end
end
