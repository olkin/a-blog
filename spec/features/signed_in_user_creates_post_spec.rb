require 'rails_helper'

feature 'Creating a blog post' do
  scenario 'is successful for signed in user' do
    user = create(:user)

    sign_in_as user
    visit root_path

    fill_in 'Title', with: 'First one!'
    fill_in 'Body', with: 'ABC, here we come!'
    click_button 'Create Post'

    expect(page).to have_css('h2', text: 'First one!')
    expect(page).to have_content 'ABC, here we come!'
    expect(page).to have_button 'Create Post'
  end
end