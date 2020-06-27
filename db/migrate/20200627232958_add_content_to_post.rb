class AddContentToPost < ActiveRecord::Migration[5.2]
  def change
    add_reference :posts, :postable, polymorphic: true, index: true
  end
end
