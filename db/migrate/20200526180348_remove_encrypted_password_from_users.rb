class RemoveEncryptedPasswordFromUsers < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :encrypted_password, :string, limit: 128, null: false
    remove_column :users, :confirmation_token, :string, limit: 128
    remove_column :users, :remember_token, :string, limit: 128, null: false
  end
end
