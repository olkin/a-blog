# require 'rails_helper'
#
# feature 'Anonym user accessing home page', js: true do
#   scenario 'is successful' do
#     visit root_path
#     expect(page).to have_content 'Welcome'
#     expect(page).to have_content 'Sign in'
#   end
#
#   # feature 'with system messages' do
#   #   given!(:system_post) { create :post, :system, body: 'You should see me' }
#   #   given!(:regular_post) { create :post, body: 'You should not see me' }
#   #
#   #   scenario 'is successful' do
#   #     visit root_path
#   #     expect(page).to have_content 'You should see me'
#   #     expect(page).not_to have_content 'You should not see me'
#   #   end
#   # end
# end