module Admin
  module Dashboard
    class QuestionsController < ApplicationController
      def index
        @questions = Question.all
      end

      def destroy
        question = Question.find(params['id'])
        question.taggings.destroy_all
        question.destroy!

        redirect_to admin_dashboard_questions_path
      end

      def nuke
        Tagging.destroy_all
        Question.destroy_all

        redirect_to admin_dashboard_questions_path
      end
    end
  end
end
