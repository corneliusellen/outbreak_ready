class MenuItemsController < ApplicationController
  def new; end

  def index
    @ingredients = params[:ingredients]
  end

  def create
    write_to_local_stoarge
    string = RTesseract.new("./public/uploads/#{params[:file].original_filename}").to_s
    ingredients = Services::MenuDataCleaner.new(string).find_ingredients!

    redirect_to menu_items_path(ingredients: ingredients)
  end

  private

  def write_to_local_stoarge
    uploaded_file = params[:file]
    File.open(Rails.root.join('public', 'uploads', uploaded_file.original_filename), 'wb') do |file|
      file.write(uploaded_file.read)
    end
  end
end
