class AddEventTeamReference < ActiveRecord::Migration[5.2]
  def change
    add_column :event_teams, :reference, :string
  end
end
