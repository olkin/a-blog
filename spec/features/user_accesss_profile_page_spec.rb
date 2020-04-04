require 'rails_helper'

feature 'Accessing profile page' do
  given(:user) { create(:user, email: 'friend@example.com') }
  given!(:post) { create(:post, user: user, title: 'What am I going to do today?', body: 'program!') }

  scenario 'shows existing posts of requested user, does not allow to follow' do
    visit user_path(user)

    expect(page).to have_content 'friend@example.com'
    expect(page).to have_css('h3', text: 'What am I going to do today?')
    expect(page).to have_content 'program!'
    expect(page).not_to have_link 'Follow'
  end

  scenario 'shows existing posts of requested user; allows to follow if signed-in' do
    another_user = create(:user)

    sign_in_as(another_user)
    visit user_path(user)

    expect(page).to have_content 'friend@example.com'
    expect(page).to have_css('h3', text: 'What am I going to do today?')
    expect(page).to have_content 'program!'
    expect(page).to have_link 'Follow'
  end
end