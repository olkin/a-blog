class Post < ApplicationRecord
  belongs_to :user

  validates :body, presence: true

  scope :system, ->{ where kind: :system }
end