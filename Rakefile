#!/usr/bin/env rake
# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path('../config/application', __FILE__)

Skeleton::Application.load_tasks

task :default => 'test:js'

namespace :test do
  desc 'Runs all javascripts tests'
  task :js do
    puts `node_modules/jasmine-node/bin/jasmine-node spec`
  end
end
