class CreateMatch < ActiveRecord::Migration[5.2]
  def change
    create_table :matches do |t|
      t.references :event
      t.integer :number
      t.string :court
      t.string :team1_reference
      t.string :team2_reference

      t.timestamps
    end
  end
end
