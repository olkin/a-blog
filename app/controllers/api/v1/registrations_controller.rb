class Api::V1::RegistrationsController < ApplicationController
  before_action :set_event

  def index
    registrations = @event.registrations.order(:created_at)
    render json: registrations
  end

  def create
    registration = @event.registrations.build(registration_params)

    if registration.save
      render json: registration, status: :created
    else
      render json: { error: registration.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def registration_params
    result = params.require(:registration).permit(:tier, :contact_info, :comment,
                                         players: [], available_equipment: [])
    result[:players] = result[:players].reject(&:blank?) if result[:players]
    result[:available_equipment] = result[:available_equipment].reject(&:blank?) if result[:available_equipment]
    result
  end

  def set_event
    @event = Event.find(params[:event_id])
  end
end
