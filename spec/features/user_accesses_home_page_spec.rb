require 'rails_helper'

feature 'Accessing home page for signed-in users' do
  given(:user) { create(:user, email: 'tom.hanks@example.com') }

  background do
    sign_in_as(user)
  end

  scenario 'is successful ' do
    visit root_path
    expect(page).to have_content 'Welcome, tom.hanks@example.com'
    expect(page).to have_button 'Sign out'
  end
end