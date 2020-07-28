class CreateQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :questions do |t|
      t.integer :section
      t.string :text
      t.boolean :mandatory
      t.integer :answer_type
      t.text :answer_choices, array: true, default: []
      t.text :redcap_metadata
    end
  end
end
