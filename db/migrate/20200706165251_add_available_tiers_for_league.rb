class AddAvailableTiersForLeague < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :tiers, :string, array: true, default: []
  end
end
