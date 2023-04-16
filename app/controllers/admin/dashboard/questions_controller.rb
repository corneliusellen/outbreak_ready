module Admin
  module Dashboard
    class QuestionsController < ApplicationController
      def index
        @questions = Question.all
      end

      def destroy
        question = Question.find(params['id'])
        if !question.children.empty?
          flash[:error] =
            "Question ##{question.id} has children questions and cannot be deleted. Please remove questions with parent ##{question.id} first and then try again."
        else
          question.destroy!
          flash[:success] = "Successfully deleted question ##{question.id}"
        end

        redirect_to admin_dashboard_questions_path
      end

      def nuke
        Intake.destroy_all
        QuestionnaireQuestion.destroy_all
        Questionnaire.destroy_all
        Tagging.destroy_all
        Question.destroy_all

        redirect_to admin_dashboard_questions_path
      end
    end
  end
end
