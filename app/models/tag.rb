class Tag < ApplicationRecord
  enum name: {
              local: 0,
              event: 1,
              restaurant: 2,
              camp: 3,
              school: 4,
              childcare_or_preschool: 5,
              prison: 6
             }

  has_many :taggings
  has_many :questions, through: :taggings

  has_many :intakes
  has_many :questionnaires, through: :intakes
end
