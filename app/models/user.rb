class User < ApplicationRecord
  include Clearance::User

  has_many :posts, dependent: :destroy
  # TODO: should be uniq
  has_and_belongs_to_many :followers,
                          class_name: 'User',
                          join_table: 'followers_users',
                          association_foreign_key: "follower_id"


  # TODO: move to some sort of service class
  def follow(another_user)
    another_user.followers << self unless another_user.followers.include?(self)
  end

  def unfollow(another_user)
    another_user.followers.destroy(self)
  end

  def follows?(another_user)
    another_user.followers.include?(self)
  end
end
