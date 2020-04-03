require 'rails_helper'

describe 'User associations' do
  let(:user) { create :user }

  describe '#posts' do
    subject { user.posts }

    let!(:post) { create :post, user: user }

    it { is_expected.to eq [post] }

    context 'on user removal' do
      it 'destroys posts' do
        expect{ user.destroy! }.to change { Post.count }.by(-1)
      end
    end
  end
end
