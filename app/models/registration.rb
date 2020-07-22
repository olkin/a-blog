class Registration < ApplicationRecord
  belongs_to :event
  belongs_to :event_team

  validates :players, :tier, presence: true

  scope :not_participating, ->{ where(event_team: nil) }
end