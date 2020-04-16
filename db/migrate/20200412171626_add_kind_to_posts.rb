class AddKindToPosts < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :kind, :string
  end
end
