class Api::V1::EventsController < ApplicationController
  include CurrentUserConcern

  def index
    events = Event.upcoming.order(:start_date)
    render json: events, include: :user
  end

  def create
    event = Event.new(event_params.merge(user: current_user, start_date: 3.days.from_now))

    if event.save
      render json: event, status: :created
    else
      render json: { error: event.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def event_params
    params.require(:event).permit(:name, :info)
  end
end
