require 'rails_helper'

describe Post do
  it 'has valid factory' do
    expect(build(:post)).to be_valid
    expect(create(:post)).to be_valid
  end

  describe 'validations' do
    let(:post) { build :post }

    context 'without body' do
      it { is_expected.to be_invalid }
    end
  end
end

