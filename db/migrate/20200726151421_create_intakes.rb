class CreateIntakes < ActiveRecord::Migration[6.0]
  def change
    create_table :intakes do |t|
      t.references :questionnaire, null: false, foreign_key: true
      t.references :tag, null: false, foreign_key: true
    end
  end
end
