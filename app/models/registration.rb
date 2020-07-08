class Registration < ApplicationRecord
  belongs_to :event

  validates :players, :tier, presence: true
end