require 'rails_helper'

feature 'signed in user deleting own post' do
  given(:user) { create :user }
  given!(:post) { create :post, user: user, title: 'Old post', body: 'Old body' }

  background do
    sign_in_as user
    visit signed_in_root_path
  end

  scenario 'is successful' do
    click_on 'Delete'

    expect(page).to have_content 'Post was successfully removed'
    expect(page).not_to have_content 'Old post'
    expect(page).not_to have_content 'Old body'
  end

  scenario 'is unsuccessful when post cannot be deleted' do
    allow_any_instance_of(Post).to receive(:destroy!)
    click_on 'Delete'

    expect(page).to have_content 'Post could not be removed'
    expect(page).to have_content('Old post')
    expect(page).to have_content('Old body')
  end
end