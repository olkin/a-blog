require 'rails_helper'

feature 'signed in user editing own post' do
  given(:user) { create :user }
  given!(:post) { create :post, user: user, title: 'Old post', body: 'Old body' }

  background do
    sign_in_as user
    visit signed_in_root_path
    click_on 'Edit'

    fill_in 'Title', with: 'New post'
    fill_in 'Body', with: 'New body'
    select 'system', from: 'Kind'
  end

  # scenario 'is successful' do
  #   click_button 'Save Post'
  #
  #   expect(page).to have_content 'Post was successfully updated'
  #
  #   expect(page).to have_css('h3', text: 'New post')
  #   expect(page).to have_content 'New body'
  #   expect(page).to have_css('.post.post__system')
  #
  #   expect(page).not_to have_css('h3', text: 'Old Post')
  #   expect(page).not_to have_content 'Old body'
  # end
  #
  # scenario 'is unsuccessful when post cannot be saved' do
  #   allow_any_instance_of(Post).to receive(:valid?) { false }
  #   click_button 'Save Post'
  #
  #   expect(page).to have_content 'Post cannot be saved'
  #
  #   expect(page).to have_field('Title', with: 'New post')
  #   expect(page).to have_field('Body', with: 'New body')
  #   expect(page).to have_select('Kind', selected: 'system')
  #   expect(page).to have_button 'Save Post'
  # end
end