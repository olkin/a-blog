FactoryBot.define do
  factory :registration do
    event
    sequence(:players) { |n| ["Player #{n}"] }
    tier { 'competitive' }
  end
end