module Admin
  class DashboardController < ApplicationController
    def index; end

    def upload
      @result = Services::CsvImporter.new(csv_contents).import!
    end

    private

    def csv_contents
      input_file.read
    end

    def input_file
      params['file']
    end
  end
end
