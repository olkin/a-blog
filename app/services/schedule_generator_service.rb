class ScheduleGeneratorService
  attr_reader :teams, :courts

  def initialize(teams:, courts:)
    @teams = teams
    @courts = courts
  end

  def generate
    raise 'Not enough courts' if courts.size < teams.size/2

    generate_matches(formula: MATCHES_FORMULAS[teams.size])
  end

  private

  MATCHES_FORMULAS = {
      4 => {
          1 => [[0, 3], [1, 2]],
          2 => [[0, 2], [1, 3]],
          3 => [[0, 1], [2, 3]]
      },

      6 => {
          1 => [[0, 5], [1, 4], [2,3]],
          2 => [[0, 3], [1, 2], [4,5]],
          3 => [[0, 1], [2, 4], [3,5]]
      }
  }

  def generate_matches(formula:)
    raise 'Unknown number of teams' unless formula

    result = []

    formula.each do |game_number, schedule|
      schedule.each_with_index do |(team1_index, team2_index), court_index|
        result << { game: game_number,
                    team1: teams[team1_index],
                    team2: teams[team2_index],
                    court: courts[court_index] }
      end
    end

    result
  end

end