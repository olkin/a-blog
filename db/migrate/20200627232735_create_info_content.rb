class CreateInfoContent < ActiveRecord::Migration[5.2]
  def change
    create_table :info_contents do |t|
      t.string :title
      t.text :body

      t.timestamps
    end
  end
end
