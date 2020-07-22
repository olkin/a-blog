class Registration < ApplicationRecord
  belongs_to :event
  belongs_to :participant

  validates :players, :tier, presence: true

  scope :not_participating, ->{ where(participant_id: nil) }
end