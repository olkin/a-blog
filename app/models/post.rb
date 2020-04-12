class Post < ApplicationRecord
  KINDS = [:system]

  belongs_to :user

  validates :body, presence: true

  scope :system, ->{ where kind: :system }
end