class MatchesController < ApplicationController
  before_action :set_event

  def generate
    matches = ScheduleGeneratorService.new(teams: params[:teams].split('\s*,\s*'),
                                           courts: params[courts].split('\s*,\s*')).generate
    # TODO: transaction
    matches.each do |match_formula|
      @event.matches.create!(match_formula)
    end

    render json: { message: "#{matches.size} created" }, status: :ok
  end

  private

  def set_event
    @event = Event.find(params[:event_id])
  end
end