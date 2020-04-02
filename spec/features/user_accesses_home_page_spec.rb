require 'rails_helper'

feature 'User accesses home page' do
  scenario 'successfully' do
    visit root_path
    expect(page).to have_content 'Wohoo'
  end
end