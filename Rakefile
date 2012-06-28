#!/usr/bin/env rake
# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path('../config/application', __FILE__)

Skeleton::Application.load_tasks

task :default => 'test:js'

namespace :js do
  desc 'compiles the javascript files'
  task :compile => ['dist:create'] do
    files = Dir['app/assets/javascripts/**/*.js']
    files.each{|f| 
      puts "Compiling #{f}"
      puts `java -jar script/compiler.jar --warning_level QUIET --js=#{f} --js_output_file=dist/#{f}` 
    }
  end
end

namespace :dist do
  task :create do
    FileUtils.rm_rf "dist"
    FileUtils.mkdir "dist"
    puts `cp -r * dist/`
    puts "Ignore the above message about dist/dist"
  end

  desc 'Serves a copy of the app with all resources compiled'
  task :server => ['create'] do
    IO.popen( "cd dist > /dev/null && rake server") do |f| f.each { |line| puts line } end
  end
end

task :server do
  STDOUT.sync = true
  STDERR.sync = true
  puts
  puts "Serving from #{`pwd`}"
  puts
  load('script/rails')
end

namespace :test do
  desc 'Runs all javascripts tests'
  task :js do
    puts `node_modules/jasmine-node/bin/jasmine-node spec`
  end
end
