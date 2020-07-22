class EventTeam < ApplicationRecord
  belongs_to :event
  has_one :registration
end