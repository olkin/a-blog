FactoryBot.define do
  factory :event do
    user
    sequence(:name) { |n| "Event ##{n}" }
    sequence(:info) { |n| "Info ##{n}" }
    start_date { 3.days.from_now }

    trait :past do
      start_date { 3.days.ago }
    end

    trait :future do
      start_date { 3.days.from_now }
    end
  end
end