require 'rails_helper'

describe UsersController do
  let(:user) { create :user }

  describe 'GET #show' do
    it 'shows user\'s page' do
      get :show, params: { id: user.to_param }

      expect(response).to have_http_status :ok
    end
  end

  describe 'POST #follow' do
    let(:user2) { create :user }

    before do
      sign_in_as user2
    end

    it 'starts to follow user' do
      expect { post :follow, params: { id: user.to_param } }
          .to change{ user.followers.count }.by(1)

      expect(response).to have_http_status :found
    end

    context 'if is already following' do
      before do
        user.followers << user2
      end

      it 'does not change followers count' do
        expect { post :follow, params: { id: user.to_param } }
            .not_to change{ user.followers.count }

        expect(response).to have_http_status :found
      end
    end
  end

  describe 'DELETE #unfollow' do
    let(:user2) { create :user }

    before do
      sign_in_as user2
      user.followers << user2
    end

    it 'removes from following' do
      expect { delete :unfollow, params: { id: user.to_param } }.
          to change{ user.followers.count }.by(-1)

      expect(response).to have_http_status :found
    end
  end
end