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
    @sections = mapped_with_children(questions).group_by{ |q| q[:section] }
  end

  def redcap
    questionnaire = Questionnaire.find(params['id'])
    questions = questionnaire.questions

    respond_to do |format|
      format.csv { send_data questions.to_csv(questionnaire.title), filename: "redcap_data_dictionary_#{questionnaire.title}.csv"}
    end
  end

  # def standard
  #   questions = Question.standard
  #   mapped_with_children(questions).group_by{ |q| q[:section] }
  # end

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

  def required_params
    params.permit!
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
