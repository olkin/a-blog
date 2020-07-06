class Api::V1::EventsController < ApplicationController
  include CurrentUserConcern

  before_action :set_event, only: [:destroy, :show, :update]

  def index
    events = Event.future.order(:start_date)
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
    if @event.update(event_params)
      render json: @event, status: :ok
    else
      render json: { error: @event.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    if can_destroy?
      @event.destroy!
      render json: @event, status: :ok
    else
      render json: { }, status: :unprocessable_entity
    end
  end

  private

  def event_params
    params.require(:event).permit(:name, :info, :start_date, :format, tiers: [])
  end

  def can_destroy?
    # TODO: add abilities
    current_user == @event.user
  end

  def set_event
    @event = Event.find(params[:id])
  end
end
