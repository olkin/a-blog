require 'rails_helper'

describe 'Event validations' do
  subject { event }

  let(:event) { build :event }

  context 'without info' do
    before do
      event.info = nil
    end

    it { is_expected.to be_invalid }
  end

  context 'without name' do
    before do
      event.name = nil
    end

    it { is_expected.to be_invalid }
  end

  context 'without start date' do
    before do
      event.start_date = nil
    end

    it { is_expected.to be_invalid }
  end
end
