require 'rails_helper'

describe 'Post factories' do
  subject { post }

  let(:post) { build :post }

  it { is_expected.to be_valid }

  context 'for saved factory' do
    let(:post) { create :post }

    it { is_expected.to be_valid }
  end
end
