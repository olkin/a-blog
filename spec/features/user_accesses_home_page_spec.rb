# require 'rails_helper'
#
# feature 'Accessing home page for signed-in users', js: true do
#   given(:user) { create(:user, email: 'tom.hanks@example.com') }
#
#   background do
#     allow_any_instance_of(SessionsController).to receive(:current_user) { user }
#   end
#
#   scenario 'is successful' do
#     visit root_path
#
#     expect(page).to have_content 'Welcome, tom.hanks@example.com'
#     expect(page).to have_link 'Sign out'
#   end
# end