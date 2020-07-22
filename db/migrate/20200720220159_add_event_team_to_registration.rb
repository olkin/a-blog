class AddEventTeamToRegistration < ActiveRecord::Migration[5.2]
  def change
    add_reference :registrations, :event_team
  end
end
