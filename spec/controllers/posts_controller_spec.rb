require 'rails_helper'

describe PostsController do
  let(:user) { create :user }

  before do
    sign_in_as(user)
  end

  describe 'POST #create' do
    it 'assigns posts' do
      expect { post :create, params: { post: { body: 'hello', title: 'title' } } }.
          to change { user.posts.count }.by(1)

      expect(response).to have_http_status :found
    end

    context 'when Post data is invalid' do
      it 'does not save invalid post, shows error message' do
        allow_any_instance_of(Post).to receive(:valid?) { false }

        expect { post :create, params: { post: { body: 'hello', title: 'title' } } }.
            not_to change { user.posts.count }

        expect(flash[:error]).to eq 'Oopsie'
        expect(response).to have_http_status :ok
      end
    end
  end
end