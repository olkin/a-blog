class AddRegistration < ActiveRecord::Migration[5.2]
  def change
    create_table :registrations do |t|
      t.references :event
      t.string :tier
      t.string :players, array: true, default: []
      t.string :available_equipment, array: true, default: []
      t.text :contact_info
      t.text :comment

      t.timestamps
    end
  end
end
