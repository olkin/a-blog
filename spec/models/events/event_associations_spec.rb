require 'rails_helper'

describe 'Event associations' do
  let(:event) { build :event }

  it 'belongs to user' do
    expect(event.user).to be_a User
  end

  describe '#registrations' do
    let(:event) { create :event }
    let!(:registration) { create :registration, event: event }

    it 'belongs to user' do
      expect(event.registrations).to eq [registration]
    end
  end
end