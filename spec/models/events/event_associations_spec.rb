require 'rails_helper'

describe 'Event associations' do
  let(:event) { build :event }

  it 'belongs to user' do
    expect(event.user).to be_a User
  end
end
