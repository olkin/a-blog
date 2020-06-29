class Api::V1::EventsController < ApplicationController
  include CurrentUserConcern

  before_action :set_event, only: [:destroy, :show, :update]

  def index
    events = Event.upcoming.order(:start_date)
    render json: events, include: :user
  end

  def create
    event = Event.new(event_params.merge(user: current_user))

    if event.save
      render json: event, status: :created
    else
      render json: { error: event.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    render json: @event
  end

  def update
    @event.update(event_params)
    render json: @event
  end

  def destroy
    # TODO: check if this user can destroy
    @event.destroy!

    render json: { }
  end

  private

  def event_params
    params.require(:event).permit(:name, :info, :start_date)
  end

  def set_event
    @event = Event.find(params[:id])
  end
end
