require 'rails_helper'

describe 'Event factories' do
  subject { event }

  let(:event) { build :event }

  it { is_expected.to be_valid }

  context 'for saved factory' do
    let(:event) { create :event }

    it { is_expected.to be_valid }
  end
end
