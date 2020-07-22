class AddParticipantReference < ActiveRecord::Migration[5.2]
  def change
    add_column :participants, :reference, :string
  end
end
