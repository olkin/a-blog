class Api::V1::RegistrationsController < ApplicationController
  before_action :set_event

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
    params.require(:registration).permit(:tier, :contact_info, :comment, players: [], available_equipment: [])
  end

  def set_event
    @event = Event.find(params[:event_id])
  end
end
