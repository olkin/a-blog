require 'rails_helper'

feature 'signed in user creating a blog post', js: true do
  given(:user) { create :user }

  background do
    sign_in_as user
    visit signed_in_root_path

    find('a', text: 'Add new post').click

    fill_in 'Title', with: 'First message'
    fill_in 'Body', with: 'ABC, here we come!'
    #  click_on 'Add new post'
  end

  scenario 'is successful for regular messages' do
    select 'system', from: 'Kind'
    click_button 'Create Post'

    expect(page).not_to have_field('Title')
    expect(page).not_to have_field('Body')
    expect(page).not_to have_button 'Create Post'

    expect(page).to have_css('h3', text: 'First message')
    expect(page).to have_content 'ABC, here we come!'
  end

  scenario 'is successful for system messages' do
    click_button 'Create Post'

    expect(page).not_to have_field('Title')
    expect(page).not_to have_field('Body')
    expect(page).not_to have_button 'Create Post'
    expect(page).to have_css('h3', text: 'First message')
    expect(page).to have_content 'ABC, here we come!'
  end

  # scenario 'is unsuccessful when post cannot be saved' do
  #   allow_any_instance_of(Post).to receive(:valid?) { false }
  #   click_button 'Create Post'
  #
  #   expect(page).to have_field('Title', with: 'First one!')
  #   expect(page).to have_field('Body', with: 'ABC, here we come!')
  #   expect(page).to have_button 'Create Post'
  # end
end