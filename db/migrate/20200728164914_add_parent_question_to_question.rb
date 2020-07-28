class AddParentQuestionToQuestion < ActiveRecord::Migration[6.0]
  def change
    add_column :questions, :parent_id, :integer, null: true, index: true
    add_foreign_key :questions, :questions, column: :parent_id
  end
end
