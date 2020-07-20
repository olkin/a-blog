class CreateParticipants < ActiveRecord::Migration[5.2]
  def change
    create_table :participants do |t|
      t.references :event
      t.string :tier
      t.integer :points

      t.timestamps
    end
  end
end
