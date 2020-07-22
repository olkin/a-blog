class Api::V1::EventTeamsController < ApplicationController
  before_action :set_event

  def index
    @event_teams = @event.event_teams

    render json: @event_teams, include: :registration, status: :ok
  end

  private

  def set_event
    @event = Event.find(params[:event_id])
  end
end
