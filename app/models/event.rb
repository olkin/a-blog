class Event < ApplicationRecord
  FORMATS = ['women_2s', 'men_2s', 'coed_2s', 'coed_3s', 'coed_4s', 'kids', 'other']

  belongs_to :user
  has_many :registrations

  validates :name, :start_date, :info, presence: true
  validates :format, inclusion: {in: FORMATS}, allow_blank: true

  scope :future, ->{ where("start_date >= ?", Time.zone.now) }
  scope :past, -> { where("start_date < ?", Time.zone.now) }
end