class Intake < ApplicationRecord
  belongs_to :questionnaire
  belongs_to :tag
end
