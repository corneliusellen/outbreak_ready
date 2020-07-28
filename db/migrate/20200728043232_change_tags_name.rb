class ChangeTagsName < ActiveRecord::Migration[6.0]
  def change
    change_column :tags, :name, :string
  end
end
