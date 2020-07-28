module Admin
  class DashboardController < ApplicationController
    def index

    end

    def upload
      result = Services::CsvImporter.new(csv_contents).import!
      if result
        flash[:notice] = "CSV import successful!"
      else
        flash[:notice] = "CSV import failed."
      end
        redirect_to action: :index
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
