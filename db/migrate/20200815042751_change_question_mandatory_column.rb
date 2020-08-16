class ChangeQuestionMandatoryColumn < ActiveRecord::Migration[6.0]
  def change
    change_column :questions, :mandatory, :string
  end
end
