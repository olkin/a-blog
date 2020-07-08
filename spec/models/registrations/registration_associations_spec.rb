require 'rails_helper'

describe 'Registration associations' do
  let(:registration) { build :registration }

  it 'belongs to event' do
    expect(registration.event).to be_a Event
  end
end
