require 'rails_helper'

feature 'Accesing dashboard page' do
  given(:user) { create(:user, email: 'friend@example.com') }
  given!(:post) { create(:post, user: user, title: 'What am I going to do today?', body: 'program!') }

  given(:user2) { create(:user) }
  given!(:post2) { create(:post, user: user2, title: 'Own posts should not appear') }


  background do
    sign_in_as(user2)
  end

  scenario 'shows existing posts' do
    visit user_path(user)

    expect(page).to have_content 'friend@example.com'
    expect(page).to have_css('h3', text: 'What am I going to do today?')
    expect(page).to have_content 'program!'
    expect(page).not_to have_content 'Own posts should not appear'
  end
end