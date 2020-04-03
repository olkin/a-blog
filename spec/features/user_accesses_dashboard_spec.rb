require 'rails_helper'

feature 'Accesing dashboard page' do
  given(:user) { create(:user) }
  given!(:post) { create(:post, user: user, title: 'We are the champions!', body: 'my friend') }

  background do
    sign_in_as(user)
  end

  scenario 'shows existing posts' do
    visit signed_in_root_path

    expect(page).to have_css('h3', text: 'We are the champions!')
    expect(page).to have_content 'my friend'
  end
end