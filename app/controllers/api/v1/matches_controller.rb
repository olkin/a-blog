class Api::V1::MatchesController < ApplicationController
  before_action :set_event

  def index
    @matches = @event.matches

    render json: @matches, status: :ok
  end

  def generate
    matches = ScheduleGeneratorService.new(teams: params[:teams].split('\s*,\s*'),
                                           courts: params[:courts].split('\s*,\s*')).generate
    # TODO: transaction
    new_matches = matches.each do |match_formula|
      @event.matches.create!(match_formula)
    end

    render json: { message: "#{matches.size} created", matches: new_matches }, status: :created
  end

  private

  def set_event
    @event = Event.find(params[:event_id])
  end
end