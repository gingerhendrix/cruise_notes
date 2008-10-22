require 'rubygems'
begin
  require 'rake'
rescue LoadError
  puts 'This script should only be accessed via the "rake" command.'
  puts 'Installation: gem install rake -y'
  exit
end
require 'rake'
require 'rake_remote_task'

$:.unshift File.dirname(__FILE__) + "/tasks/lib"


role :app_server, 'gandrew.com'
DEPLOY_ROOT = '/var/web/projects/cruise_notes'

Dir['tasks/**/*.rake'].each { |rake| load rake }




