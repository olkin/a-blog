require 'rails_helper'

describe 'User factories' do
  subject { user }

  let(:user) { build :user }

  it { is_expected.to be_valid }

  context 'for saved factory' do
    let(:user) { create :user }

    it { is_expected.to be_valid }
  end
end
