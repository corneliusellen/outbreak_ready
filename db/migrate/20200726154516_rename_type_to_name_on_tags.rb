class RenameTypeToNameOnTags < ActiveRecord::Migration[6.0]
  def change
    rename_column :tags, :type, :name
  end
end
