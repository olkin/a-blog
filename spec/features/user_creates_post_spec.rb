require 'rails_helper'

feature 'signed in user creating a blog post' do
  given(:user) { create :user }

  background do
    sign_in_as user
    visit signed_in_root_path
  end

  scenario 'is successful' do
    fill_in 'Title', with: 'First system message'
    fill_in 'Body', with: 'Even anonymous users will see me. Yay!'
    select 'system', from: 'Kind'
    click_button 'Create Post'

    expect(page).to have_field('Title')
    expect(page).to have_field('Body')
    expect(page).to have_css('h3', text: 'First system message')
    expect(page).to have_content 'Even anonymous users will see me. Yay!'
    expect(page).to have_button 'Create Post'
    expect(page).to have_css('.post.post__system')
  end

  scenario 'is successful for system messages' do
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