require 'rails_helper'

feature 'Accessing home page ' do
  scenario 'is successful for non signed-in users' do
    visit root_path
    expect(page).to have_content 'Wohoo'
    expect(page).to have_content 'Sign in'
  end

  scenario 'is successful for signed-in users' do
    user = create(:user, email: 'tom.hanks@example.com', password: 'password')

    sign_in_as(user)
    visit root_path
    expect(page).to have_content 'Welcome, tom.hanks@example.com'
    expect(page).to have_button 'Sign out'
  end
end