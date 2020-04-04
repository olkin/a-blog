require 'rails_helper'

describe 'User methods' do
  let(:user) { create :user }

  describe '#follow' do
    let(:another_user) { create :user }

    it 'adds user followers of another user' do
      user.follow(another_user)

      expect(another_user.reload.followers).to eq [user]
    end

    context 'when user already follows another user' do
      before do
        another_user.followers << user
      end

      it 'adds user followers of another user' do
        user.follow(another_user)

        expect(another_user.reload.followers).to eq [user]
      end
    end
  end

  describe '#unfollow' do
    let(:another_user) { create :user }

    before do
      another_user.followers << user
    end

    it 'unfollows another user' do
      expect(another_user.followers).to eq [user]
      user.unfollow(another_user)

      expect(another_user.reload.followers).not_to eq [user]
    end
  end

  describe '#follows?' do
    let(:another_user) { create :user }

    before do
      another_user.followers << user
    end

    it 'returns true if user follows another user' do
      expect(user.follows?(another_user)).to eq true
      expect(another_user.follows?(user)).to eq false
    end
  end
end
