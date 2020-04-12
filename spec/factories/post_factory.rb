FactoryBot.define do
  factory :post do
    user
    sequence(:body) { |n| "Body ##{n}" }

    trait :system do
      kind { :system }
    end
  end
end