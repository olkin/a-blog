# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_07_07_223656) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "events", force: :cascade do |t|
    t.string "name"
    t.bigint "user_id"
    t.text "info"
    t.date "start_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "format"
    t.string "tiers", default: [], array: true
    t.string "requested_equipment", default: [], array: true
    t.integer "players_count"
    t.index ["user_id"], name: "index_events_on_user_id"
  end

  create_table "registrations", force: :cascade do |t|
    t.bigint "event_id"
    t.string "tier"
    t.string "players", default: [], array: true
    t.string "available_equipment", default: [], array: true
    t.text "contact_info"
    t.text "comment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_registrations_on_event_id"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email", null: false
    t.string "password_digest"
    t.index ["email"], name: "index_users_on_email"
  end

end
