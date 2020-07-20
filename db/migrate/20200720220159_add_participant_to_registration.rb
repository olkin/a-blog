class AddParticipantToRegistration < ActiveRecord::Migration[5.2]
  def change
    add_reference :registrations, :participant
  end
end
