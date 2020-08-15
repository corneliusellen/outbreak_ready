# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_08_15_042751) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "intakes", force: :cascade do |t|
    t.bigint "questionnaire_id", null: false
    t.bigint "tag_id", null: false
    t.index ["questionnaire_id"], name: "index_intakes_on_questionnaire_id"
    t.index ["tag_id"], name: "index_intakes_on_tag_id"
  end

  create_table "questionnaire_questions", force: :cascade do |t|
    t.bigint "questionnaire_id", null: false
    t.bigint "question_id", null: false
    t.index ["question_id"], name: "index_questionnaire_questions_on_question_id"
    t.index ["questionnaire_id"], name: "index_questionnaire_questions_on_questionnaire_id"
  end

  create_table "questionnaires", force: :cascade do |t|
    t.string "title"
  end

  create_table "questions", force: :cascade do |t|
    t.integer "section"
    t.string "text"
    t.string "mandatory"
    t.integer "answer_type"
    t.text "answer_choices", default: [], array: true
    t.text "redcap_metadata"
    t.integer "parent_id"
  end

  create_table "taggings", force: :cascade do |t|
    t.bigint "question_id", null: false
    t.bigint "tag_id", null: false
    t.index ["question_id"], name: "index_taggings_on_question_id"
    t.index ["tag_id"], name: "index_taggings_on_tag_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string "name"
  end

  add_foreign_key "intakes", "questionnaires"
  add_foreign_key "intakes", "tags"
  add_foreign_key "questionnaire_questions", "questionnaires"
  add_foreign_key "questionnaire_questions", "questions"
  add_foreign_key "questions", "questions", column: "parent_id"
  add_foreign_key "taggings", "questions"
  add_foreign_key "taggings", "tags"
end
