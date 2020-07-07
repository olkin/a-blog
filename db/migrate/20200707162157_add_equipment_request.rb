class AddEquipmentRequest < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :requested_equipment, :string, array: true, default: []
  end
end
