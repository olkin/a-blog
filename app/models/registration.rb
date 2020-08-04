class Registration < ApplicationRecord
  belongs_to :event
  belongs_to :event_team, optional: true

  validates :players, :tier, presence: true

  scope :not_participating, ->{ where(event_team: nil) }
end