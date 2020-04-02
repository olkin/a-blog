require 'rails_helper'

feature 'Accessing home page ' do
  scenario 'is successful for non signed-in users' do
    visit root_path
    expect(page).to have_content 'Wohoo'
    expect(page).to have_content 'Sign in'
  end

  scenario 'is successful for signed-in users' do
    email = 'tom.hanks@example.com'
    password = 'password'

    # TODO: use factory_bot
    User.create(email: email, password: password)

    # TODO: move to a helper
    visit sign_in_path
    fill_in 'Email', with: email
    fill_in 'Password', with: password
    click_button 'Sign in'

    visit root_path
    expect(page).to have_content 'Wohoo'
    expect(page).to have_content 'Signed in as: tom.hanks@example.com'
  end
end