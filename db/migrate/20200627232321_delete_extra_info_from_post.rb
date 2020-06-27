class DeleteExtraInfoFromPost < ActiveRecord::Migration[5.2]
  def change
    remove_column :posts, :title, :text
    remove_column :posts, :body, :text
    remove_column :posts, :kind, :string
  end
end
