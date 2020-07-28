class Tag < ApplicationRecord
  has_many :taggings
  has_many :questions, through: :taggings

  has_many :intakes
  has_many :questionnaires, through: :intakes
end
