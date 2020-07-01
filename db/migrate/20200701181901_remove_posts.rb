class RemovePosts < ActiveRecord::Migration[5.2]
  def change
    drop_table :posts do  |t|
      t.references :user
      t.text :title
      t.text :body
      t.string :kind

      t.timestamps
    end
  end
end
