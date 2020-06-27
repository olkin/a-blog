class RemoveUserFromEvent < ActiveRecord::Migration[5.2]
  def change
    remove_column :events, :user_id, :bigint
  end
end
