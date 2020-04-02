FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "email_#{n}@example.com" }
    sequence(:password) {|n| "password_#{n}" }
  end
end