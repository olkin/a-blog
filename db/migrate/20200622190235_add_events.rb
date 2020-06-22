class AddEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :name
      t.references :user
      t.text :info
      t.date :start_date
      t.timestamps
    end
  end
end
