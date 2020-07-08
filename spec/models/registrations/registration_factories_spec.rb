require 'rails_helper'

describe 'Registration factories' do
  subject { registration }

  let(:registration) { build :registration }

  it { is_expected.to be_valid }

  context 'for saved factory' do
    let(:registration) { create :registration }

    it { is_expected.to be_valid }
  end
end
