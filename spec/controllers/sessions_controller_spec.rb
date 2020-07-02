require 'rails_helper'

describe SessionsController do
  describe 'POST #create' do
    let(:user) { create :user, email: 'existingemail@abc.com', password: 'myPassword' }

    it 'is successful' do
      post :create, params: { user: { email: user.email, password: 'myPassword' } }

      expect(response).to have_http_status :created

      json_response = JSON.parse(response.body)
      expect(json_response['user']['email']).to eq 'existingemail@abc.com'
      expect(json_response['logged_in']).to eq true
    end

    it 'is unsuccessful when password does not match' do
      post :create, params: { user: { email: user.email, password: 'wrongPassword' } }

      expect(response).to have_http_status :unauthorized
    end

    it 'is unsuccessful if user does not exist' do
      post :create, params: { user: { email: 'thisEmailDoesNotExist5364@nonExist.com', password: 'whateverPassword' } }

      expect(response).to have_http_status :unauthorized
    end
  end

  describe 'GET #logged_in' do
    let(:user) { create :user, email: 'existingemail@abc.com', password: 'myPassword' }

    context 'if user is logged in' do
      it 'returns login info' do
        get :logged_in, session: { user_id: user.id }

        expect(response).to have_http_status :ok

        json_response = JSON.parse(response.body)
        expect(json_response['logged_in']).to eq true
      end
    end

    context 'if user is not logged in' do
      it 'return not logged in' do
        get :logged_in

        expect(response).to have_http_status :ok

        json_response = JSON.parse(response.body)
        expect(json_response['logged_in']).to eq false
      end
    end
  end

  describe 'DELETE #logout' do
    let(:user) { create :user }

    it 'logs user out' do
      expect(controller).to receive(:reset_session)

      delete :logout, session: { user_id: user.id }

      expect(response).to have_http_status :ok

      json_response = JSON.parse(response.body)
      expect(json_response['logged_out']).to eq true
    end
  end
end
