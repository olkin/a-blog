require 'rails_helper'

feature 'Creating a blog post' do
  given(:user) { create :user }

  background do
    sign_in_as user
    visit signed_in_root_path
  end

  scenario 'is successful for signed in user' do
    fill_in 'Title', with: 'First one!'
    fill_in 'Body', with: 'ABC, here we come!'
    click_button 'Create Post'

    expect(page).to have_field('Title')
    expect(page).to have_field('Body')
    expect(page).to have_css('h3', text: 'First one!')
    expect(page).to have_content 'ABC, here we come!'
    expect(page).to have_button 'Create Post'
  end

  scenario 'is unsuccessful when post cannot be saved' do
    allow_any_instance_of(Post).to receive(:valid?) { false }

    fill_in 'Title', with: 'First one!'
    fill_in 'Body', with: 'ABC, here we come!'
    click_button 'Create Post'

    expect(page).to have_field('Title', with: 'First one!')
    expect(page).to have_field('Body', with: 'ABC, here we come!')
    expect(page).to have_button 'Create Post'
  end
end