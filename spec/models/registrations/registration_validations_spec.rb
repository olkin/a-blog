require 'rails_helper'

describe 'Registration validations' do
  subject { registration }

  let(:registration) { build :registration }

  context 'without players' do
    before do
      registration.players = []
    end

    it { is_expected.to be_invalid }
  end

  context 'without tier info' do
    before do
      registration.tier = ''
    end

    it { is_expected.to be_invalid }
  end
end
