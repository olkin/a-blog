FactoryBot.define do
  factory :post do
    user
    sequence(:body) { |n| "Body ##{n}" }
  end
end