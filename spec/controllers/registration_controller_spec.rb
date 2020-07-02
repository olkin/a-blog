require 'rails_helper'

describe RegistrationsController do
  describe 'POST #create' do
    subject(:create_user) { post :create, params: {
        user: { email: 'thebest@example.com', password: 'verySecretPassword' } }
    }

    it 'is successful' do
      expect{ create_user }.to change{ User.count }.by(1)

      json_response = JSON.parse(response.body)
      expect(json_response['user']['email']).to eq 'thebest@example.com'
      expect(response).to have_http_status :created
    end

    context 'when params are wrong' do
      before do
        allow_any_instance_of(User).to receive(:save) { false }
      end

      it 'does not create a new user' do
        expect{ create_user }.not_to change{ User.count }
        expect(response).to have_http_status :unprocessable_entity
      end
    end
  end
end