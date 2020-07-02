require 'rails_helper'

describe 'Event scopes' do
  let!(:future_event) { create :event, start_date: 1.day.from_now }
  let!(:today_event) { create :event, start_date: Time.zone.now }
  let!(:old_event) { create :event, start_date: 1.day.ago }

  it 'returns correct events based on start date' do
    expect(Event.future).to match_array [future_event, today_event]
    expect(Event.past).to eq [old_event]
  end
end
