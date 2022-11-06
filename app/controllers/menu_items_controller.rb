class MenuItemsController < ApplicationController

  def show_new
    @id = params[:id]
  end

  def new
    @id = params[:id]
  end

  def index
    @ingredients = params[:ingredients]
    @id = params[:id]
  end

  def create
    write_to_local_stoarge
    string = RTesseract.new("./tmp/#{params[:file].original_filename}").to_s
    ingredients = Services::MenuDataCleaner.new(string).find_ingredients!

    redirect_to menu_items_path(ingredients: ingredients, id: params[:id])
  end

  private

  def write_to_local_stoarge
    uploaded_file = params[:file]
    File.open(Rails.root.join('tmp', uploaded_file.original_filename), 'wb') do |file|
      file.write(uploaded_file.read)
    end
  end
end


class MenuItemsController < ApplicationController

  def show_new
    @id = params[:id]
  end

  def new
    @id = params[:id]
  end

  def index
    @ingredients = params[:ingredients]
    @id = params[:id]
  end

  def create
    write_to_local_stoarge
    string = RTesseract.new("./tmp/#{params[:file].original_filename}").to_s
    ingredients = Services::MenuDataCleaner.new(string).find_ingredients!

    redirect_to menu_items_path(ingredients: ingredients, id: params[:id])
  end

  private

  def write_to_local_stoarge
    uploaded_file = params[:file]
    File.open(Rails.root.join('tmp', uploaded_file.original_filename), 'wb') do |file|
      file.write(uploaded_file.read)
    end
  end
end
