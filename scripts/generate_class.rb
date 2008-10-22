
RAILS_ROOT = File.dirname(__FILE__) + "/../../cruise_control"

if ARGV.length < 1
  puts "Usage: generate_class classname \n"
  exit
end

require RAILS_ROOT + "/config/boot.rb"
require RAILS_ROOT + "/config/environment"

klass = ARGV[0].constantize

klassDef = {'name' => klass.name,
                    'singleton_methods' => klass.singleton_methods(false).sort.map { |m| {'name' => m, 'tags' => [] } },
                    'instance_methods' =>  klass.instance_methods(false).sort.map { |m| {'name' => m, 'tags' => [] } } }

puts klassDef.to_yaml
puts "\n";

filename =  'classes/'+klass.name.underscore+'.yml'
if File.exists? filename
  puts "File #{filename} exists - not overwriting \n"
  exit
end

File.open filename, "w" do |io|
  io.write klassDef.to_yaml
end
puts "Class Definition written to #{filename}\n"


