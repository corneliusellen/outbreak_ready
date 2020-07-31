module Admin
  module Dashboard
    class TagsController < ApplicationController
      def index
        @tag_names = Tag.all.pluck(:name)
      end
    end
  end
end
