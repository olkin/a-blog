require 'rails_helper'

describe Post do
  it 'has valid factory' do
    expect(build(:post)).to be_valid
    expect(create(:post)).to be_valid
  end

  describe 'validations' do
    subject { post }

    let(:post) { build :post }

    context 'without body' do
      before do
        post.body = nil
      end

      it { is_expected.to be_invalid }
    end

    context 'without title' do
      before do
        post.title = nil
      end

      it { is_expected.to be_valid }
    end
  end
end

