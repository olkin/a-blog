require 'rails_helper'

feature 'Following a user' do
  given(:user) { create :user }
  given(:user2) { create :user }

  background do
    sign_in_as user
  end

  scenario 'is successful for another user' do
    visit user_path(user2)

    click_on 'Follow'
    expect(page).not_to have_link 'Follow'

    click_on 'Unfollow'
    expect(page).not_to have_link 'Unfollow'
  end

  scenario 'is not successful for same user' do
    visit user_path(user)

    expect(page).not_to have_content 'Follow'
    expect(page).not_to have_content 'Following'
  end
end