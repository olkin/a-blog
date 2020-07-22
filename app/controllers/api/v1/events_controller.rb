class Api::V1::EventsController < ApplicationController
  include CurrentUserConcern

  before_action :set_event, only: [:destroy, :show, :update, :register_all]

  def index
    events = Event.future.order(:start_date, :id)
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

  # TODO: maybe own controller/service
  def register_all
    # TODO: put into transactions
    registrations_to_convert = @event.registrations.not_participating
    number_of_registrations_to_convert = registrations_to_convert.size
    registrations_to_convert.each do |registration|
      participant = @event.participants.create!(tier: registration.tier)
      registration.update(participant: participant)
    end

    render json: { message: "#{number_of_registrations_to_convert} registrations created" }, status: :created
  end

  private

  def event_params
    # TODO: check user input
    params.require(:event).permit(:name, :info, :start_date, :format, tiers: [], requested_equipment: [])
  end

  def can_destroy?
    # TODO: add abilities
    current_user == @event.user
  end

  def set_event
    @event = Event.find(params[:id])
  end
end
