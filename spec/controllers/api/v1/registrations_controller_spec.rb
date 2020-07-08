require 'rails_helper'

describe Api::V1::RegistrationsController do
  let(:event) { create :event }

  describe 'GET #index' do
    let!(:event_registration) { create :registration,
                                       event: event,
                                       players: ['Olga1', 'Olga2'],
                                       tier: 'competitive' }
    let!(:event_registration2) { create :registration,
                                        event: event,
                                        players: ['Olga3', 'Olga4'],
                                        created_at: 2.minutes.ago,
                                        tier: 'competitive'}
    let!(:registration) { create :registration }

    it 'is successful' do
      get :index, params: { event_id: event.to_param }

      expect(response).to have_http_status :ok
    end

    it 'shows registrations of the event' do
      get :index, params: { event_id: event.to_param }

      json_response = JSON.parse(response.body)
      expect(json_response.size).to eq(2)

      first_event = json_response.first
      expect(first_event['players']).to eq ['Olga3', 'Olga4']
      expect(first_event['tier']).to eq 'competitive'

      second_event = json_response.last
      expect(second_event['players']).to eq ['Olga1', 'Olga2']
      expect(second_event['tier']).to eq 'competitive'
    end
  end

  describe 'POST #create' do
    subject(:create_registration) { post :create, params: {
        event_id: event.to_param,
        registration: { tier: 'rec',
                        contact_info: '555-555-5555',
                        comment: 'We want to play!',
                        players: ['Olga', 'Tim', ''],
                        available_equipment: ['balls', 'nets']
        }}
    }

    it 'is successful' do
      expect { create_registration }.to change { Registration.count }.by(1)

      json_response = JSON.parse(response.body)
      expect(json_response['tier']).to eq 'rec'
      expect(json_response['contact_info']).to eq '555-555-5555'
      expect(json_response['comment']).to eq 'We want to play!'
      expect(json_response['players']).to eq ['Olga', 'Tim']
      expect(json_response['available_equipment']).to eq ['balls', 'nets']

      expect(response).to have_http_status :created
    end

    context 'with wrong params' do
      before do
        allow_any_instance_of(Registration).to receive(:save) { false }
      end

      it 'is not successful' do
        expect { create_registration }.not_to change { Registration.count }

        expect(response).to have_http_status :unprocessable_entity
      end
    end
  end
end
