class AddNumberOfRegisteredPlayersToEvent < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :players_count, :integer
  end
end
