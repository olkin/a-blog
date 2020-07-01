require 'rails_helper'

describe 'User associations' do
  let(:user) { create :user }

  context 'with events' do
    let!(:user_event) { create :event, user: user }
    let!(:other_user_event) { create :event }

    it 'has many events' do
      expect(user.events).to eq [user_event]
    end
  end
end
