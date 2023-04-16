module Admin
  class DashboardController < ApplicationController
    def index
      @headers = ['ID', 'Question group', 'Section', 'Question', 'Mandatory', 'Field Type', 'Choices, Calculations, OR Slider Labels', 'Tag1', 'Tag2',
                  'Variable / Field Name', 'Form Name', 'SectionHeader', 'Field Label', 'Field Note', 'Text Validation Type OR Show Slider Number',
                  'Text Validation Min', 'Text Validation Max', 'Identifier?', 'Branching Logic (Show field only if...)', 'Required Field?',
                  'Custom Alignment', 'Question Number (surveys only)', 'Matrix Group Name', 'Matrix Ranking?', 'Field Annotation']
    end

    def upload
      result = Services::CsvImporter.new(csv_contents).import!
      if result == 'success'
        flash[:success] = 'CSV import successful!'
      else
        flash[:error] = "CSV import failed: #{result}"
      end
      redirect_to action: :index
    end

    def sample_csv
      respond_to do |format|
        format.csv do
          response.headers['Content-Type'] = 'text/csv'
          response.headers['Content-Disposition'] = 'attachment; filename=example_questions.csv'
          render template: '/admin/dashboard/example_csv.csv.erb'
        end
      end
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
