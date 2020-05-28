# require 'rails_helper'
#
# feature 'Accesing profile page', js: true do
#   given(:user) { create(:user, email: 'friend@example.com') }
#   given!(:post) { create(:post, user: user, title: 'What am I going to do today?', body: 'program!') }
#
#   scenario 'shows existing posts of requested user' do
#     visit user_path(user)
#
#     expect(page).to have_content 'friend@example.com'
#     expect(page).to have_css('h3', text: 'What am I going to do today?')
#     expect(page).to have_content 'program!'
#   end
# end