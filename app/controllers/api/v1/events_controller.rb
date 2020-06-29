class Api::V1::EventsController < ApplicationController
  include CurrentUserConcern

  before_action :set_event, only: [:destroy, :show, :update]

  def index
    events = Event.upcoming.order(:start_date)
    render json: events, include: :user
  end

  def create
    Rails.logger.info '*MEOW+' * 20
    Rails.logger.info current_user.inspect
    Rails.logger.info @current_user.inspect
    Rails.logger.info session.inspect
    Rails.logger.info session.loaded?
    session['init'] = 123
    Rails.logger.info session.loaded?


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
