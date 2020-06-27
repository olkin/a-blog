class Event < ApplicationRecord
  include Postable

  validates :name, :start_date, :info, presence: true

  scope :upcoming, ->{ where("start_date >= ?", Time.zone.now) }
  scope :past, -> { where("start_date < ?", Time.zone.now) }
end