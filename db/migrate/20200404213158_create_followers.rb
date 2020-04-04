class CreateFollowers < ActiveRecord::Migration[5.2]
  def change
    create_join_table :users, :followers
  end
end
