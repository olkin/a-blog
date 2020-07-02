require 'rails_helper'

describe Api::V1::EventsController do
  describe 'GET #index' do
    let!(:future_event1) { create(:event, start_date: 1.day.from_now) }
    let!(:future_event2) { create(:event, start_date: 7.days.from_now) }
    let!(:future_event3) { create(:event, start_date: 3.days.from_now) }
    let!(:past_event) { create(:event, :past) }

    it 'is successful' do
      get :index

      expect(response).to have_http_status :ok
    end

    it 'shows future events ordered by default' do
      get :index

      json_response = JSON.parse(response.body)
      expect(json_response.size).to eq(3)
      expect(json_response.map{ |event| event['id'] }).to eq [future_event1.id, future_event3.id, future_event2.id]
    end
  end

  describe 'DELETE #destroy' do
    subject(:delete_event) { delete :destroy, params: { id: event.to_param } }

    let!(:event) { create :event }

    before do
      allow(controller).to receive(:can_destroy?) { true }
    end

    it 'deletes event' do
      expect { delete_event }.to change { Event.count }.by(-1)

      expect(response).to have_http_status :ok
    end

    context 'when not permitted' do
      before do
        allow(controller).to receive(:can_destroy?) { false }
      end

      it 'does not delete event' do
        expect { delete_event }.not_to change { Event.count }

        expect(response).to have_http_status :unprocessable_entity
      end
    end
  end

  describe 'GET #show' do
    let(:event) { create :event,
                         name: 'Best Event in Town',
                         info: 'Join us for Babreque and volleyball',
                         format: 'coed_4s'}

    it 'provides info about the event' do
      get :show, params: { id: event.to_param }

      json_response = JSON.parse(response.body)
      expect(json_response['name']).to eq 'Best Event in Town'
      expect(json_response['info']).to eq 'Join us for Babreque and volleyball'
      expect(json_response['format']).to eq 'coed_4s'
      expect(response).to have_http_status :ok
    end

    context 'for id that does not exist' do
      it 'returns error' do
        expect { get :show, params: { id: 198623465 } }.to raise_error ActiveRecord::RecordNotFound
      end
    end
  end

  describe 'PUT #update' do
    subject(:update_event) {  put :update, params: {
        id: event.to_param,
        event: { name: 'Updated Name', info: 'Updated Info', format: 'coed_2s', start_date: '1991-07-09' }
    } }

    let(:event) { create :event }

    it 'updates event params' do
      update_event

      event.reload
      expect(event.name).to eq 'Updated Name'
      expect(event.info).to eq 'Updated Info'
      expect(event.format).to eq 'coed_2s'
      expect(event.start_date).to eq Date.new(1991, 7, 9)

      expect(response).to have_http_status :ok
    end

    context 'with wrong params' do
      before do
        allow_any_instance_of(Event).to receive(:save) { false }
      end

      it 'does not update with wrong parameters' do
        update_event

        event.reload
        expect(event.name).not_to eq 'Updated Name'
        expect(event.info).not_to eq 'Updated Info'
        expect(event.format).not_to eq 'coed_2s'
        expect(event.start_date).not_to eq Date.new(1991, 7, 9)

        expect(response).to have_http_status :unprocessable_entity
      end
    end
  end

  describe 'POST #create' do
    subject(:create_event) { post :create, params: {
        event: { name: 'Best event ever', info: 'Join', format: 'coed_3s', start_date: '2020-07-09' } }
    }

    let(:user) { create :user }

    before do
      allow(controller).to receive(:current_user) { user }
    end

    it 'is successful' do
      expect { create_event }.to change { Event.count }.by(1)

      json_response = JSON.parse(response.body)
      expect(json_response['name']).to eq 'Best event ever'
      expect(json_response['info']).to eq 'Join'
      expect(json_response['format']).to eq 'coed_3s'
      expect(json_response['start_date']).to eq '2020-07-09'

      expect(response).to have_http_status :created
    end

    context 'with wrong params' do
      before do
        allow_any_instance_of(Event).to receive(:save) { false }
      end

      it 'is not successful' do
        expect { create_event }.not_to change { Event.count }

        expect(response).to have_http_status :unprocessable_entity
      end
    end
  end
end