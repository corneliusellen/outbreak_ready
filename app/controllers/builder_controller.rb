class BuilderController < ApplicationController
  def index
    @id = params['id']
  end
end
