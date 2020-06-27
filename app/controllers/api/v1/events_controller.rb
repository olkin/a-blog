class Api::V1::EventsController < ApplicationController
  def index
    events = Event.upcoming.order(:start_date)
    render json: events, include: :posts
  end
end
