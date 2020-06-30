class Event < ApplicationRecord
  FORMATS = ['women_2s', 'men_2s', 'coed_2s', 'coed_3s', 'coed_4s', 'kids', 'other']
  belongs_to :user

  validates :name, :start_date, :info, presence: true
  validates :format, inclusion: {in: FORMATS}, allow_blank: true

  scope :upcoming, ->{ where("start_date >= ?", Time.zone.now) }
  scope :past, -> { where("start_date < ?", Time.zone.now) }
end