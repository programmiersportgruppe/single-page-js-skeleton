#!/usr/bin/env rake
# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path('../config/application', __FILE__)

Skeleton::Application.load_tasks

task :default => 'test:js'

def run cmd
  output = `#{cmd}`
  puts output if !output.chomp.strip.empty?
end

namespace :js do
  desc 'compiles the javascript files'
  task :compile => ['dist:create'] do
    all_files = Dir['dist/app/assets/javascripts/**/*.js']
    run " cd dist/app/assets/javascripts && ../../../node_modules/requirejs/bin/r.js -o name=main.js out=compiled.js baseUrl=."

    FileUtils.rm_rf (all_files - Dir['dist/app/assets/javascripts/curl.js', 'dist/app/assets/javascripts/curl/**/*', 'dist/app/assets/javascripts/compiled.js'])
  end
end

namespace :html do
  task :preprocess => ['dist:create'] do
    html_files = Dir['dist/**/*html.haml']
    html_files.each{|f|
      puts `ruby -pi -e 'gsub(/#JAVASCRIPT_PROCESSING/,"compiled")' #{f}`
    }
  end
end

namespace :dist do
  task :create => ['clean'] do
    FileUtils.mkdir "dist"
    run "cp -r * dist/"
    puts "Ignore the above message about dist/dist"
    FileUtils.rm_rf Dir['dist/**/.*sw*']
  end

  desc 'Serves a copy of the app with all resources compiled'
  task :server => ['dist:create', 'js:compile', 'html:preprocess'] do
    IO.popen( "cd dist > /dev/null && rake server") do |f| f.each { |line| puts line } end
  end
end

task :server do
  STDOUT.sync = true
  STDERR.sync = true
  puts "Serving from #{`pwd`}"
  load('script/rails')
end

desc 'Cleans all build artifacts'
task :clean do
  FileUtils.rm_rf "dist"
end

namespace :test do
  desc 'Runs all javascripts tests'
  task :js do
    puts `node_modules/jasmine-node/bin/jasmine-node spec`
  end
end
