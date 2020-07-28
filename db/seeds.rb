# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'csv'

Tagging.destroy_all
Intake.destroy_all
QuestionnaireQuestion.destroy_all
Questionnaire.destroy_all
Question.destroy_all
Tag.destroy_all

tags_csv = File.read('./db/tags.csv')

CSV.parse(tags_csv).each do |row|
  Tag.create!(name: row.first)
end
