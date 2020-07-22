class CreateEventTeams < ActiveRecord::Migration[5.2]
  def change
    create_table :event_teams do |t|
      t.references :event
      t.string :tier
      t.integer :points

      t.timestamps
    end
  end
end
