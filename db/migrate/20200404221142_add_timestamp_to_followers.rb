class AddTimestampToFollowers < ActiveRecord::Migration[5.2]
  def change
    add_column :followers_users, :created_at, :datetime, null: false
    add_column :followers_users, :updated_at, :datetime, null: false
  end
end
